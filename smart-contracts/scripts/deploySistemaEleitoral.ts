import { ethers } from "hardhat";
import {saveDeployment} from "deployment-history"
async function main() {
  const signers = await ethers.getSigners();
  const SistemaEleitoralFactory = await ethers.getContractFactory("SistemaEleitoral",signers[1])
  const sistemaEleitoral = await SistemaEleitoralFactory.deploy()
  await sistemaEleitoral.waitForDeployment()
  saveDeployment(await sistemaEleitoral.getAddress(),"SistemaEleitoral")
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
