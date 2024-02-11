import { ethers } from "hardhat";
import { candidatosMock } from "./candidatoMock";

export async function deploySistemaEleitoralComEleicaoFixture() {
  const signers = await ethers.getSigners();
  const SistemaEleitoralFactory = await ethers.getContractFactory("SistemaEleitoral");
  const sistemaEleitoral = await SistemaEleitoralFactory.deploy();
  const EleicaoFactory = await ethers.getContractFactory("Eleicao")
  const eleicao = await EleicaoFactory.deploy(2024,sistemaEleitoral.target,candidatosMock)
  const network = await ethers.provider.getNetwork()
  return {signers, sistemaEleitoral, eleicao,network}
}