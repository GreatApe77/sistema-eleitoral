import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { candidatosMock } from "./utils/candidatoMock";
import { getRandomAccounts } from "./utils/getRandomAccounts";
import { deploySistemaEleitoralComEleicaoFixture } from "./utils/fixtures";


describe("SistemaEleitoral",()=>{
    it("Deve ser possivel anexar uma eleição",async()=>{
        const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
        expect(await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.emit(sistemaEleitoral,"EleicaoCriada")
    })
    it("Não Deve ser possível anexar uma eleição(Não é o administrador)",async()=>{
      const {sistemaEleitoral,eleicao,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      expect(sistemaEleitoral.connect(signers[1]).anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.be.revertedWithCustomError(sistemaEleitoral,"OwnableUnauthorizedAccount")
    })
    it("Nao deve ser posivel anexar uma eleição com o mesmo ano",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)
      expect(sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoJaExiste")
    })
    it("Não deve ser possível anexar uma eleição que não implemente a interface IEleicao",async()=>{
      const {sistemaEleitoral,signers} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      const mockContract = await ethers.getContractFactory("MockContract")
      const mock = await mockContract.deploy()
      expect(sistemaEleitoral.anexarEleicao(2024,mock.target)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
    it("Não deve ser possível anexar uma eleição que seu número difere do ano passado ao parametro",async()=>{
      const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
      expect(sistemaEleitoral.anexarEleicao(2025,eleicao.target)).to.be.revertedWithCustomError(sistemaEleitoral,"SistemaEleitoral__EleicaoNaoExiste")
    })
})