import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { candidatosMock } from "./utils/candidatoMock";
enum StatusDaEleicao {
  NAO_INICIADA,
  ATIVA,
  ENCERRADA
}

function getRandomAccounts(numberOfAccounts: number) {
  const accounts = [];
  for (let i = 0; i < numberOfAccounts; i++) {
    accounts.push(ethers.Wallet.createRandom());
  }
  return accounts;
}
//Esses testes não estão bem escritos, mas servem para testar o contrato
describe("Eleicao", function () {
  async function deployFixture() {
    const signers = await ethers.getSigners();
    const EleicaoFactory = await ethers.getContractFactory("Eleicao");
    const eleicao = await EleicaoFactory.deploy(2024,candidatosMock);
    const eleicaoAddress = await eleicao.getAddress();
    return { eleicao, signers, eleicaoAddress };
  }

  it("deve ler os candidatos iniciais", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidatosCadastrados = await eleicao.getCandidatos(0, 8);
    candidatosCadastrados.map((candidato, index) => {
      expect(candidato.nome).to.be.equal(candidatosMock[index].nome);
      expect(candidato.partido).to.be.equal(candidatosMock[index].partido);
      expect(candidato.fotoDoCandidatoUrl).to.be.equal(
        candidatosMock[index].fotoDoCandidatoUrl
      );
      expect(candidato.numeroDeVotacao).to.be.equal(
        candidatosMock[index].numeroDeVotacao
      );
      expect(candidato.quantidadeDeVotos).to.be.equal(
        candidatosMock[index].quantidadeDeVotos
      );
    });
  });
  it("deve ler os candidatos iniciais com uma grande quantidade de candidatos", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidatosCadastrados = await eleicao.getCandidatos(0, 150);
    candidatosCadastrados.map((candidato, index) => {
      expect(candidato.nome).to.be.equal(candidatosMock[index].nome);
      expect(candidato.partido).to.be.equal(candidatosMock[index].partido);
      expect(candidato.fotoDoCandidatoUrl).to.be.equal(
        candidatosMock[index].fotoDoCandidatoUrl
      );
      expect(candidato.numeroDeVotacao).to.be.equal(
        candidatosMock[index].numeroDeVotacao
      );
      expect(candidato.quantidadeDeVotos).to.be.equal(
        candidatosMock[index].quantidadeDeVotos
      );
    });
  });
  it("Nao Deve  cadastar candidato com numero repetido", async () => {
    const EleicaoFactory = await ethers.getContractFactory("Eleicao");
    const copyCandidatosMock = [...candidatosMock];
    copyCandidatosMock.push({
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    });
    copyCandidatosMock.push({
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge Andrade",
      partido: "PTdoB",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    });
    await expect(
      EleicaoFactory.deploy(2022,copyCandidatosMock)
    ).to.be.revertedWithCustomError(
      EleicaoFactory,
      "Eleicao__CandidatoJaExiste"
    );
  });
  it("Nao Deve cadastar candidato com votos diferentes de ZERO", async () => {
    const EleicaoFactory = await ethers.getContractFactory("Eleicao");
    const copyCandidatosMock = [...candidatosMock];

    copyCandidatosMock.push({
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 9999,
      indice: 0,
    });

    await expect(
      EleicaoFactory.deploy(2022,copyCandidatosMock)
    ).to.be.revertedWithCustomError(EleicaoFactory, "Eleicao__VotosNaoZerados");
  });
  it("Nao deve cadastrar um candidato (Não é administrador)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidato = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    await expect(
      eleicao.connect(signers[1]).cadastrarCandidato(candidato)
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAdministrador");
  })
  it("Deve cadastrar um candidato depois da criação do contrato", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidato = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    await eleicao.cadastrarCandidato(candidato);

    const candidatoCadastrado = await eleicao.candidatoPorNumero(13);
    expect(candidatoCadastrado.nome).to.be.equal(candidato.nome);
    expect(candidatoCadastrado.partido).to.be.equal(candidato.partido);
    expect(candidatoCadastrado.fotoDoCandidatoUrl).to.be.equal(
      candidato.fotoDoCandidatoUrl
    );
    expect(candidatoCadastrado.numeroDeVotacao).to.be.equal(
      candidato.numeroDeVotacao
    );
    expect(candidatoCadastrado.quantidadeDeVotos).to.be.equal(
      candidato.quantidadeDeVotos
    );
  });
  it("Nao deve cadastrar um candidato (eleicao ja começou)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidato = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    await eleicao.iniciarEleicao()
    await expect(
      eleicao.cadastrarCandidato(candidato)
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAntesDaEleicao");
  })
  it("Nao deve votar se a eleicao nao tiver iniciada", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await expect(eleicao.votar(13,ethers.Wallet.createRandom().address)).to.be.revertedWithCustomError(
      eleicao,
      "Eleicao__EleicaoNaoEstaAtiva"
    );
  })
  it("Nao deve votar fora do prazo de votação", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await eleicao.iniciarEleicao()
    await time.increase(60*60*24*2) // 2 dias no futuro
    await expect(eleicao.votar(13,ethers.Wallet.createRandom().address)).to.be.revertedWithCustomError(
      eleicao,
      "Eleicao__PrazoParaVotacaoEncerrado"
    );
  })
  it("Nao deve iniciar eleicao(NAO É ADMINISTRADOR)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await expect(
      eleicao.connect(signers[1]).iniciarEleicao()
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAdministrador");
  })
  it("Nao deve iniciar eleicao(Eleicao ja começou)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await eleicao.iniciarEleicao()
    await expect(
      eleicao.iniciarEleicao()
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAntesDaEleicao");
  })
  it("Deve alterar o status da eleicao para ATIVA", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await eleicao.iniciarEleicao()
    const status = await eleicao.statusDaEleicao()
    expect(status).to.be.equal(StatusDaEleicao.ATIVA)
  })
  it("Nao deve votar (SOMENTE ADMINISTRADOR)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await eleicao.iniciarEleicao()
    await expect(
      eleicao.connect(signers[1]).votar(13,ethers.Wallet.createRandom().address)
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAdministrador");
  })
  it("Nao deve encerrar Eleicao(SOMENTE ADMINISTRADOR)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await eleicao.iniciarEleicao()
    await expect(
      eleicao.connect(signers[1]).encerrarEleicao()
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAdministrador");
   
  })
  it("Nao deve encerrar Eleicao(Eleicao nao começou)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    //await eleicao.iniciarEleicao()
    //await eleicao.encerrarEleicao()
    await expect(
      eleicao.encerrarEleicao()
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__EleicaoNaoEstaAtiva");
  })
  it("Deve cadastrar um candidato depois da criação do contrato e retornar uma pagina de candidatos", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );

    const candidatosMockCopy = [...candidatosMock];
    const candidato = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    candidatosMockCopy.push(candidato);
    await eleicao.cadastrarCandidato(candidato);

    const candidatosCadastrados = await eleicao.getCandidatos(0, 9);
    candidatosCadastrados.map((candidato, index) => {
      expect(candidato.nome).to.be.equal(candidatosMockCopy[index].nome);
      expect(candidato.partido).to.be.equal(candidatosMockCopy[index].partido);
      expect(candidato.fotoDoCandidatoUrl).to.be.equal(
        candidatosMockCopy[index].fotoDoCandidatoUrl
      );
      expect(candidato.numeroDeVotacao).to.be.equal(
        candidatosMockCopy[index].numeroDeVotacao
      );
      expect(candidato.quantidadeDeVotos).to.be.equal(
        candidatosMockCopy[index].quantidadeDeVotos
      );
    });
  });
  it("Nao deve deletar um candidato que nao existe",async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    await expect(eleicao.deletarCandidato(9999)).to.be.revertedWithCustomError(
      eleicao,
      "Eleicao__CandidatoNaoExiste"
    );
  })
  it("Deve deletar um candidato depois da criação do contrato", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidato1 = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    const candidato2 = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Italo Lima",
      partido: "PTdoB",
      numeroDeVotacao: 14,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    const numeroDeCanidatosAntesDoCadastro =
      await eleicao.getQuantidadeDeCandidatos();
    await eleicao.cadastrarCandidato(candidato1);
    const candidatoCadastrado1 = await eleicao.candidatoPorNumero(
      candidato1.numeroDeVotacao
    );
    const indiceCandidato1 = candidatoCadastrado1.indice;
    await eleicao.cadastrarCandidato(candidato2);
    const numeroDeCanidatosDepoisDoCadastro =
      await eleicao.getQuantidadeDeCandidatos();
    expect(numeroDeCanidatosDepoisDoCadastro).to.be.equal(
      numeroDeCanidatosAntesDoCadastro + 2n
    );
    await eleicao.deletarCandidato(candidato1.numeroDeVotacao);
    const numeroDeCanidatosDepoisDoDeletar =
      await eleicao.getQuantidadeDeCandidatos();
    const candidatoCadastro2 = await eleicao.candidatoPorNumero(
      candidato2.numeroDeVotacao
    );
    expect(candidatoCadastro2.indice).to.be.equal(indiceCandidato1);
    expect(numeroDeCanidatosDepoisDoDeletar).to.be.equal(
      numeroDeCanidatosDepoisDoCadastro - 1n
    );
    const candidatoDeletado = await eleicao.candidatoPorNumero(
      candidato1.numeroDeVotacao
    );
    expect(candidatoDeletado.nome).to.be.equal("");
    expect(candidatoDeletado.partido).to.be.equal("");
    expect(candidatoDeletado.fotoDoCandidatoUrl).to.be.equal("");
    expect(candidatoDeletado.numeroDeVotacao).to.be.equal(0);
    expect(candidatoDeletado.quantidadeDeVotos).to.be.equal(0);
    expect(candidatoDeletado.indice).to.be.equal(0);

    //to do terminar o teste
  });
  it("Deve simular uma eleição", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const candidato1 = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    const candidato2 = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Italo Lima",
      partido: "PTdoB",
      numeroDeVotacao: 14,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    const candidato3 = {
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Italo Lima",
      partido: "PTdoB",
      numeroDeVotacao: 15,
      quantidadeDeVotos: 0,
      indice: 0,
    };
    const VOTOS_CANIDATO_1 = 10
    const VOTOS_CANIDATO_2 = 9
    const VOTOS_CANIDATO_3 = 6
    const VOTOS_BRANCOS = 21
    const VOTOS_NULOS = 2
    const eleitoresCandidato1 = getRandomAccounts(VOTOS_CANIDATO_1)
    const eleitoresCandidato2 = getRandomAccounts(VOTOS_CANIDATO_2)
    const eleitoresCandidato3 = getRandomAccounts(VOTOS_CANIDATO_3)
    const eleitoresBrancos = getRandomAccounts(VOTOS_BRANCOS)
    const eleitoresNulos = getRandomAccounts(VOTOS_NULOS)
    await eleicao.cadastrarCandidato(candidato1);
    await eleicao.cadastrarCandidato(candidato2);
    await eleicao.cadastrarCandidato(candidato3);
    const NUMERO_VOTO_BRANCO = 777
    const todosOsCandidatos =[...eleitoresCandidato1,...eleitoresCandidato2,...eleitoresCandidato3,...eleitoresBrancos,...eleitoresNulos]
    await eleicao.aprovarEleitores(todosOsCandidatos.map((eleitor)=>eleitor.address))
    await eleicao.iniciarEleicao()
    for (let i = 0; i < VOTOS_CANIDATO_1; i++) {
      await eleicao.votar(candidato1.numeroDeVotacao,eleitoresCandidato1[i].address);
      
    }
    for (let i = 0; i < VOTOS_CANIDATO_3; i++) {
      await eleicao.votar(candidato3.numeroDeVotacao,eleitoresCandidato3[i].address);
      
    }
    for (let i = 0; i < VOTOS_CANIDATO_2; i++) {
      await eleicao.votar(candidato2.numeroDeVotacao,eleitoresCandidato2[i].address);
      
    }
    for (let i = 0; i < VOTOS_BRANCOS; i++) {
      await eleicao.votar(NUMERO_VOTO_BRANCO,eleitoresBrancos[i].address);
      
    }
    for (let i = 0; i < VOTOS_NULOS; i++) {
      await eleicao.votar(0,eleitoresNulos[i].address);
      
    }
    await eleicao.encerrarEleicao()
    const resultado = await eleicao.resultado()
    //console.log(resultado.quantidadeDeVotos)
    expect(resultado.quantidadeDeVotos).to.be.equal(VOTOS_CANIDATO_1+VOTOS_CANIDATO_2+VOTOS_CANIDATO_3+VOTOS_BRANCOS+VOTOS_NULOS)
    expect(resultado.quantidadeDeVotosValidos).to.be.equal(VOTOS_CANIDATO_1+VOTOS_CANIDATO_2+VOTOS_CANIDATO_3)
    expect(resultado.quantidadeDeVotosBrancos).to.be.equal(VOTOS_BRANCOS)
    expect(resultado.quantidadeDeVotosNulos).to.be.equal(VOTOS_NULOS)
    //expect(resultado.vencedores).to.be.equal(candidato3.nome)
    //expect(resultado.vencedor.quantidadeDeVotos).to.be.equal(24)
  })
});
