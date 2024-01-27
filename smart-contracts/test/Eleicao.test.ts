import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { experimentalAddHardhatNetworkMessageTraceHook } from "hardhat/config";
import { candidatosMock } from "./utils/candidatoMock";

describe("Eleicao", function () {
  async function deployFixture() {
    const signers = await ethers.getSigners();
    const EleicaoFactory = await ethers.getContractFactory("Eleicao");
    const eleicao = await EleicaoFactory.deploy(candidatosMock);
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
      EleicaoFactory.deploy(copyCandidatosMock)
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
      EleicaoFactory.deploy(copyCandidatosMock)
    ).to.be.revertedWithCustomError(EleicaoFactory, "Eleicao__VotosNaoZerados");
  });
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
    await eleicao.cadastrarCandidato(candidato1);
    await eleicao.cadastrarCandidato(candidato2);
    await eleicao.cadastrarCandidato(candidato3);
    await eleicao.iniciarEleicao()
    for (let i = 0; i < 20; i++) {
      await eleicao.votar(candidato1.numeroDeVotacao);
      
    }
    for (let i = 0; i < 24; i++) {
      await eleicao.votar(candidato3.numeroDeVotacao);
      
    }
    for (let i = 0; i < 15; i++) {
      await eleicao.votar(candidato2.numeroDeVotacao);
      
    }
    await eleicao.encerrarEleicao()
    const resultado = await eleicao.resultado()
    console.log(resultado)
    expect(resultado.vencedor.nome).to.be.equal(candidato3.nome)
    expect(resultado.vencedor.quantidadeDeVotos).to.be.equal(24)
  })
});
