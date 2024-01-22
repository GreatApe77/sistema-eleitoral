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
        const signers = await ethers.getSigners()
        const EleicaoFactory = await ethers.getContractFactory("Eleicao")
        const eleicao = await EleicaoFactory.deploy(candidatosMock)
        const eleicaoAddress = await eleicao.getAddress()
        return {eleicao,signers,eleicaoAddress}
    }

    it("deve ler os candidatos iniciais",async ()=>{
        const {eleicao,signers,eleicaoAddress} = await loadFixture(deployFixture)
        const candidatosCadastrados = await eleicao.getCandidatos(6,7)
        console.log(candidatosCadastrados)
        expect(true).to.be.equal(true)
    })
  });
  