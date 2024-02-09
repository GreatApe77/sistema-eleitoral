import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { candidatosMock } from "./utils/candidatoMock";
import { getRandomAccounts } from "./utils/getRandomAccounts";
enum StatusDaEleicao {
  NAO_INICIADA,
  ATIVA,
  ENCERRADA
}


//Esses testes não estão bem escritos, mas servem para testar o contrato
describe("Eleicao", function () {
  async function deployFixture() {
    const signers = await ethers.getSigners();
    const EleicaoFactory = await ethers.getContractFactory("Eleicao");
    const eleicao = await EleicaoFactory.deploy(2024,signers[0].address,candidatosMock,);
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
    const signers = await ethers.getSigners();
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
      EleicaoFactory.deploy(2022,signers[0].address,copyCandidatosMock)
    ).to.be.revertedWithCustomError(
      EleicaoFactory,
      "Eleicao__CandidatoJaExiste"
    );
  });
  it("Nao Deve cadastar candidato com votos diferentes de ZERO", async () => {
    const EleicaoFactory = await ethers.getContractFactory("Eleicao");
    const copyCandidatosMock = [...candidatosMock];
    const signers = await ethers.getSigners();
    copyCandidatosMock.push({
      fotoDoCandidatoUrl: "http://linkDeFoto",
      nome: "Eduardo Jorge",
      partido: "PT",
      numeroDeVotacao: 13,
      quantidadeDeVotos: 9999,
      indice: 0,
    });

    await expect(
      EleicaoFactory.deploy(2022,signers[0].address,copyCandidatosMock)
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
  it("Deve retornar o ano de eleicao", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const anoDaEleicao = await eleicao.getAnoDeEleicao()
    expect(anoDaEleicao).to.be.equal(2024);
  })
  it("Deve implementar a interface IEleicao", async () => {

    const IEleicaoInterfaceId = "0x0371ac41"
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const eleicaoInterface = await eleicao.supportsInterface(IEleicaoInterfaceId)
    expect(eleicaoInterface).to.be.equal(true)
  })
  it("Deve aprovar eleitores para a votacao", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const eleitores = getRandomAccounts(5);
    await eleicao.aprovarEleitores(eleitores.map(eleitor => eleitor.address))
    const getAprovacaoDeTodos = eleitores.map(eleitor=> eleicao.getPermissaoDeVoto(eleitor.address))
    const aprovadosParaVotar = await Promise.all(getAprovacaoDeTodos)
    aprovadosParaVotar.map(aprovado => expect(aprovado).to.be.equal(true))
    const quantidadeDeEleitores = await eleicao.getQuantidadeDeEleitores()
    expect(quantidadeDeEleitores).to.be.equal(5n)
  })
  it("Nao deve aprovar eleitores para a votacao (NAO É ADMINISTRADOR)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const eleitores = getRandomAccounts(5);

    await expect(
      eleicao.connect(signers[1]).aprovarEleitores(eleitores.map(eleitor => eleitor.address))
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAdministrador");
  })
  it("Nao deve aprovar eleitores para a votacao (Eleicao ja começou)", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const eleitores = getRandomAccounts(5);
    await eleicao.iniciarEleicao()
    await expect(
      eleicao.aprovarEleitores(eleitores.map(eleitor => eleitor.address))
    ).to.be.revertedWithCustomError(eleicao, "Eleicao__SomenteAntesDaEleicao");
  })
  it("Nao deve reverter se tentar aprovar um eleitor que ja foi aprovado", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const eleitores = getRandomAccounts(5);
    await eleicao.aprovarEleitores(eleitores.map(eleitor => eleitor.address))
    await eleicao.aprovarEleitores([eleitores[1].address])
    const eleitorJaAprovado = await eleicao.getPermissaoDeVoto(eleitores[1].address)
    expect(eleitorJaAprovado).to.be.equal(true)
  })
  it("Deve retirar a permissao de voto de um eleitor", async () => {
    const { eleicao, signers, eleicaoAddress } = await loadFixture(
      deployFixture
    );
    const eleitores = getRandomAccounts(5);
    await eleicao.aprovarEleitores(eleitores.map(eleitor => eleitor.address))
    await eleicao.retiraAprovacaoDeEleitores([eleitores[0].address,eleitores[1].address])
    const eleitor0Aprovado = await eleicao.getPermissaoDeVoto(eleitores[0].address)
    const eleitor1Aprovado = await eleicao.getPermissaoDeVoto(eleitores[1].address)
    expect(eleitor0Aprovado).to.be.equal(false)
    expect(eleitor1Aprovado).to.be.equal(false)
  })
});
