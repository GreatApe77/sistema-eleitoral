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
        const candidatosCadastrados = await eleicao.getCandidatos(0,8)
        candidatosCadastrados.map((candidato,index)=>{
          expect(candidato.nome).to.be.equal(candidatosMock[index].nome)
          expect(candidato.partido).to.be.equal(candidatosMock[index].partido)
          expect(candidato.fotoDoCandidatoUrl).to.be.equal(candidatosMock[index].fotoDoCandidatoUrl)
          expect(candidato.numeroDeVotacao).to.be.equal(candidatosMock[index].numeroDeVotacao)
          expect(candidato.quantidadeDeVotos).to.be.equal(candidatosMock[index].quantidadeDeVotos)


        })
    })
    it("Nao Deve  cadastar candidato com numero repetido",async ()=>{
      const EleicaoFactory = await ethers.getContractFactory("Eleicao")
       const copyCandidatosMock = [...candidatosMock]
       copyCandidatosMock.push({
        fotoDoCandidatoUrl:"http://linkDeFoto",
        nome:"Eduardo Jorge",
        partido:"PT",
        numeroDeVotacao:13,
        quantidadeDeVotos:0,
        indice:0
      })
      copyCandidatosMock.push({
        fotoDoCandidatoUrl:"http://linkDeFoto",
        nome:"Eduardo Jorge Andrade",
        partido:"PTdoB",
        numeroDeVotacao:13,
        quantidadeDeVotos:0,
        indice:0
      })
      await expect(EleicaoFactory.deploy(copyCandidatosMock)).to.be.revertedWithCustomError(EleicaoFactory,"Eleicao__CandidatoJaExiste")
    })
    it("Nao Deve cadastar candidato com votos diferentes de ZERO",async ()=>{
      const EleicaoFactory = await ethers.getContractFactory("Eleicao")
      const copyCandidatosMock = [...candidatosMock]

      copyCandidatosMock.push({
        fotoDoCandidatoUrl:"http://linkDeFoto",
        nome:"Eduardo Jorge",
        partido:"PT",
        numeroDeVotacao:13,
        quantidadeDeVotos:9999,
        indice:0
      })

      await expect(EleicaoFactory.deploy(copyCandidatosMock)).to.be.revertedWithCustomError(EleicaoFactory,"Eleicao__VotosNaoZerados")
    })
    it("Deve cadastrar um candidato depois da criação do contrato",async ()=>{
      const {eleicao,signers,eleicaoAddress} = await loadFixture(deployFixture)
      const candidato = {
        fotoDoCandidatoUrl:"http://linkDeFoto",
        nome:"Eduardo Jorge",
        partido:"PT",
        numeroDeVotacao:13,
        quantidadeDeVotos:0,
        indice:0
      }
      await eleicao.cadastrarCandidato(candidato)
     
      const candidatoCadastrado = await eleicao.candidatoPorNumero(13)
      expect(candidatoCadastrado.nome).to.be.equal(candidato.nome)
      expect(candidatoCadastrado.partido).to.be.equal(candidato.partido)
      expect(candidatoCadastrado.fotoDoCandidatoUrl).to.be.equal(candidato.fotoDoCandidatoUrl)
      expect(candidatoCadastrado.numeroDeVotacao).to.be.equal(candidato.numeroDeVotacao)
      expect(candidatoCadastrado.quantidadeDeVotos).to.be.equal(candidato.quantidadeDeVotos)

    })
    it("Deve cadastrar um candidato depois da criação do contrato e retornar uma pagina de candidatos",async ()=>{
      const {eleicao,signers,eleicaoAddress} = await loadFixture(deployFixture)
      
      const candidatosMockCopy = [...candidatosMock]
      const candidato = {
        fotoDoCandidatoUrl:"http://linkDeFoto",
        nome:"Eduardo Jorge",
        partido:"PT",
        numeroDeVotacao:13,
        quantidadeDeVotos:0,
        indice:0
      }
      candidatosMockCopy.push(candidato)
      await eleicao.cadastrarCandidato(candidato)
     
      const candidatosCadastrados = await eleicao.getCandidatos(0,9)
      candidatosCadastrados.map((candidato,index)=>{
        expect(candidato.nome).to.be.equal(candidatosMockCopy[index].nome)
        expect(candidato.partido).to.be.equal(candidatosMockCopy[index].partido)
        expect(candidato.fotoDoCandidatoUrl).to.be.equal(candidatosMockCopy[index].fotoDoCandidatoUrl)
        expect(candidato.numeroDeVotacao).to.be.equal(candidatosMockCopy[index].numeroDeVotacao)
        expect(candidato.quantidadeDeVotos).to.be.equal(candidatosMockCopy[index].quantidadeDeVotos)
      })
    })
  });
  