import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { Candidato, candidatosMock } from "./utils/candidatoMock";
import { getRandomAccounts } from "./utils/getRandomAccounts";
import { deploySistemaEleitoralComEleicaoFixture } from "./utils/fixtures";


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
})