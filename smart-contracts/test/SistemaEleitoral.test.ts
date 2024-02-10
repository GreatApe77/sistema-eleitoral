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
    it("Deve ser possivel criar uma eleição",async()=>{
        const {sistemaEleitoral,eleicao} = await loadFixture(deploySistemaEleitoralComEleicaoFixture)
        expect(await sistemaEleitoral.anexarEleicao(await eleicao.getAnoDeEleicao(),eleicao.target)).to.emit(sistemaEleitoral,"EleicaoCriada")
    })
    
        
})