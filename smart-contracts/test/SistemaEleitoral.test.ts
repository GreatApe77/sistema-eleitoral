import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Candidato, candidatosMock } from "./utils/candidatoMock";
import { getRandomAccounts } from "./utils/getRandomAccounts";
import { deploySistemaEleitoralComEleicaoFixture } from "./utils/fixtures";
import { VotacaoType } from "./utils/VotacaoType";
import { getEIP721Domain } from "./utils/getEIP721Domain";


describe("SistemaEleitoral",()=>{
    it("Deve ser possivel anexar uma eleição",async()=>{
        const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
        expect(await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.emit(sistemaEleitoral,"EleicaoCriada")
    })
    it("Não Deve ser possível anexar uma eleição(Não é o administrador)",async()=>{
      const {sistemaEleitoral,eleicao,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await expect(sistemaEleitoral.connect(signers[1]).anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.be.revertedWithCustomError(sistemaEleitoral,"OwnableUnauthorizedAccount")
    })
    it("Nao deve ser posivel anexar uma eleição com o mesmo ano",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      await expect(sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoJaExiste")
    })
    it("Não deve ser possível anexar uma eleição que não implemente a interface IEleicao",async()=>{
      const {sistemaEleitoral,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      const mockContract = await ethers.getContractFactory("MockContract")
      const mock = await mockContract.deploy()
      await expect(sistemaEleitoral.anexarEleicao(2024,mock.target)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
    it("Não deve ser possível anexar uma eleição que seu número difere do ano passado ao parametro",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await expect(sistemaEleitoral.anexarEleicao(2025,eleicao.target)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
    it("Deve iniciar uma eleição",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      expect(await sistemaEleitoral.iniciarEleicao(await eleicao.getAnoDeEleicao())).to.emit(eleicao,eleicao.getEvent("EleicaoIniciada").name)
    })
    it("Nao deve iniciar uma eleição (Não é o administrador)",async()=>{
      const {sistemaEleitoral,eleicao,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)

      await expect(sistemaEleitoral.connect(signers[1]).iniciarEleicao(await eleicao.getAnoDeEleicao())).to.be.revertedWithCustomError(sistemaEleitoral,"OwnableUnauthorizedAccount")
    })
    it("Nao deve iniciar uma eleição que não existe",async()=>{
      const {sistemaEleitoral} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await expect(sistemaEleitoral.iniciarEleicao(2024)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
    it("Deve encerrar uma eleição",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      await sistemaEleitoral.iniciarEleicao(await eleicao.getAnoDeEleicao())
      await time.increase(60*60*24*30)
      expect(await sistemaEleitoral.encerrarEleicao(await eleicao.getAnoDeEleicao())).to.emit(eleicao,eleicao.getEvent("EleicaoEncerrada").name)
    })
    it("Nao deve encerrar uma eleição (Não é o administrador)",async()=>{
      const {sistemaEleitoral,eleicao,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      await sistemaEleitoral.iniciarEleicao(await eleicao.getAnoDeEleicao())
      await time.increase(60*60*24*30)
      await expect(sistemaEleitoral.connect(signers[1]).encerrarEleicao(await eleicao.getAnoDeEleicao())).to.be.revertedWithCustomError(sistemaEleitoral,"OwnableUnauthorizedAccount")
    })
    it("Não deve encerrar uma eleição que não existe",async()=>{
      const {sistemaEleitoral} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await expect(sistemaEleitoral.encerrarEleicao(2024)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
    it("Deve cadastrar Candidato",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      const candidato:Candidato = {
        nome: "Carlos Santos",
        partido: "Partido B",
        fotoDoCandidatoUrl: "https://exemplo.com/foto-carlos.jpg",
        quantidadeDeVotos: 0,
        numeroDeVotacao: 99,
        indice:0
      
      }
      await expect(sistemaEleitoral.cadastrarCandidato(await eleicao.getAnoDeEleicao(),candidato)).to.emit(eleicao,eleicao.getEvent("CandidatoCadastrado").name)
    })
    it("Não deve cadastrar Candidato (Não é o administrador)",async()=>{
      const {sistemaEleitoral,eleicao,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      const candidato:Candidato = {
        nome: "Carlos Santos",
        partido: "Partido B",
        fotoDoCandidatoUrl: "https://exemplo.com/foto-carlos.jpg",
        quantidadeDeVotos: 0,
        numeroDeVotacao: 99,
        indice:0
      
      }
      await expect(sistemaEleitoral.connect(signers[1]).cadastrarCandidato(await eleicao.getAnoDeEleicao(),candidato)).to.be.revertedWithCustomError(sistemaEleitoral,"OwnableUnauthorizedAccount")
    })
    it("Deve votar em um candidato",async()=>{
      const {sistemaEleitoral,eleicao,network} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      const anoDaEleicao = await eleicao.getAnoDeEleicao()
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      const candidato:Candidato = {
        nome: "Carlos Santos",
        partido: "Partido B",
        fotoDoCandidatoUrl: "https://exemplo.com/foto-carlos.jpg",
        quantidadeDeVotos: 0,
        numeroDeVotacao: 99,
        indice:0
      
      }
      await sistemaEleitoral.cadastrarCandidato(anoDaEleicao,candidato)
      const eleitor =  getRandomAccounts(1)
      await sistemaEleitoral.aprovarEleitores(anoDaEleicao,[eleitor[0].address])
      await sistemaEleitoral.iniciarEleicao(anoDaEleicao)
      //ASSINAR O VOTO COM A CHAVE PRIVADA DO ELEITOR
      const domain = getEIP721Domain("Sistema Eleitoral",network.chainId,await sistemaEleitoral.getAddress())
      /**
       * 
       * 
       * export const VotacaoType = {
    Votacao: [
      { name: "assinante", type: "address" },
      { name: "numeroDoCandidato", type: "uint16" },
      {name:"anoDaEleicao",type:"uint256"},
      { name: "nonce", type: "uint256" },
      { name: "prazo", type: "uint256" },
    ],
  };
       */
      const prazo = Date.now() + 300000 //5 minutos
      const values = {
        assinante:eleitor[0].address,
        numeroDoCandidato:candidato.numeroDeVotacao,
        anoDaEleicao,
        nonce: await sistemaEleitoral.nonces(eleitor[0].address),
        prazo: prazo
      }
      const signature = await eleitor[0].signTypedData(domain,VotacaoType,values)
      const sigComponents = ethers.Signature.from(signature)
      const {v,r,s} = sigComponents
      await expect(sistemaEleitoral.votar(anoDaEleicao,candidato.numeroDeVotacao,eleitor[0].address,prazo,v,r,s)).to.emit(eleicao,eleicao.getEvent("VotoComputado").name)
      const candidatoRetornado = await sistemaEleitoral.candidatoPorNumero(anoDaEleicao,candidato.numeroDeVotacao)
      expect(candidatoRetornado.quantidadeDeVotos).to.be.equal(1)
      const accountNonce = await sistemaEleitoral.nonces(eleitor[0].address)
      expect(accountNonce).to.be.equal(1)
    })
    it("Não deve votar em um candidato (Eleicao nao Existe)",async()=>{
      
      const {sistemaEleitoral,network} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      const anoDaEleicao = 2024
      const eleitor =  getRandomAccounts(1)
      const domain = getEIP721Domain("Sistema Eleitoral",network.chainId,await sistemaEleitoral.getAddress())
      const prazo = Date.now() + 300000 //5 minutos
      
      const values = {
        assinante:eleitor[0].address,
        numeroDoCandidato:99,
        anoDaEleicao,
        nonce: await sistemaEleitoral.nonces(eleitor[0].address),
        prazo: prazo
      }
      const signature = await eleitor[0].signTypedData(domain,VotacaoType,values)
      const sigComponents = ethers.Signature.from(signature)
      const {v,r,s} = sigComponents
      await expect(sistemaEleitoral.votar(anoDaEleicao,99,eleitor[0].address,prazo,v,r,s)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
    it("Nao deve votar em um candidato (Nao é administrador)",async()=>{
      const {sistemaEleitoral,eleicao,signers,network} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      const anoDaEleicao = await eleicao.getAnoDeEleicao()
      await sistemaEleitoral.anexarEleicao(anoDaEleicao,eleicao.target)
      const candidato:Candidato = {
        nome: "Carlos Santos",
        partido: "Partido B",
        fotoDoCandidatoUrl: "https://exemplo.com/foto-carlos.jpg",
        quantidadeDeVotos: 0,
        numeroDeVotacao: 99,
        indice:0
      
      }
      await sistemaEleitoral.cadastrarCandidato(anoDaEleicao,candidato)
      const eleitor =  getRandomAccounts(1)
      await sistemaEleitoral.aprovarEleitores(anoDaEleicao,[eleitor[0].address])
      await sistemaEleitoral.iniciarEleicao(anoDaEleicao)
      const domain = getEIP721Domain("Sistema Eleitoral",network.chainId,await sistemaEleitoral.getAddress())
      const prazo = Date.now() + 300000 //5 minutos
      const values = {
        assinante:eleitor[0].address,
        numeroDoCandidato:candidato.numeroDeVotacao,
        anoDaEleicao,
        nonce: await sistemaEleitoral.nonces(eleitor[0].address),
        prazo: prazo
      }

      const signature = await eleitor[0].signTypedData(domain,VotacaoType,values)
      const sigComponents = ethers.Signature.from(signature)
      const {v,r,s} = sigComponents
      await expect(sistemaEleitoral.connect(signers[1]).votar(anoDaEleicao,candidato.numeroDeVotacao,eleitor[0].address,prazo,v,r,s)).to.be.revertedWithCustomError(sistemaEleitoral,"OwnableUnauthorizedAccount")

    })
    it("Deve retornar a quantidade de cnadidatos",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      const candidato:Candidato = {
        nome: "Carlos Santos",
        partido: "Partido B",
        fotoDoCandidatoUrl: "https://exemplo.com/foto-carlos.jpg",
        quantidadeDeVotos: 0,
        numeroDeVotacao: 99,
        indice:0
      
      }
      await sistemaEleitoral.cadastrarCandidato(await eleicao.getAnoDeEleicao(),candidato)
      expect(await sistemaEleitoral.getQuantidadeDeCandidatos(await eleicao.getAnoDeEleicao())).to.be.equal(candidatosMock.length + 1)
    })
    it("Deve retornar uma lista de candidatos",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      const candidato:Candidato = {
        nome: "Carlos Santos",
        partido: "Partido B",
        fotoDoCandidatoUrl: "https://exemplo.com/foto-carlos.jpg",
        quantidadeDeVotos: 0,
        numeroDeVotacao: 99,
        indice:0
      
      }
      await sistemaEleitoral.cadastrarCandidato(await eleicao.getAnoDeEleicao(),candidato)
      const candidatosRetornados = await sistemaEleitoral.getCandidatos(await eleicao.getAnoDeEleicao(),0,10)
      const candidatosNessaEleicao = [...candidatosMock,candidato]
      expect(candidatosRetornados.length).to.be.equal(candidatosNessaEleicao.length)
      candidatosRetornados.forEach((candidato,index)=>{
        expect(candidato.nome).to.be.equal(candidatosNessaEleicao[index].nome)
        expect(candidato.partido).to.be.equal(candidatosNessaEleicao[index].partido)
        expect(candidato.fotoDoCandidatoUrl).to.be.equal(candidatosNessaEleicao[index].fotoDoCandidatoUrl)
        expect(candidato.quantidadeDeVotos).to.be.equal(candidatosNessaEleicao[index].quantidadeDeVotos)
        expect(candidato.numeroDeVotacao).to.be.equal(candidatosNessaEleicao[index].numeroDeVotacao)
      })
    })
    it("Deve Aprovar um eleitor em uma eleicao",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      const eleitor = getRandomAccounts(1)
      await sistemaEleitoral.aprovarEleitores(await eleicao.getAnoDeEleicao(),[eleitor[0].address])
      expect(await sistemaEleitoral.getPermissaoDeVoto(await eleicao.getAnoDeEleicao(),eleitor[0].address)).to.be.equal(true)
    })
    it("Deve retirar a aprovação de um eleitor em uma eleicao",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      const eleitor = getRandomAccounts(1)
      await sistemaEleitoral.aprovarEleitores(await eleicao.getAnoDeEleicao(),[eleitor[0].address])
      await sistemaEleitoral.retiraAprovacaoDeEleitores(await eleicao.getAnoDeEleicao(),[eleitor[0].address])
      expect(await sistemaEleitoral.getPermissaoDeVoto(await eleicao.getAnoDeEleicao(),eleitor[0].address)).to.be.equal(false)
    })
})