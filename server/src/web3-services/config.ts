import { ethers } from "ethers";
import { environment } from "../config/environment";
import { SistemaEleitoral__factory } from "../typechain-types";



const provider = new ethers.JsonRpcProvider(environment.ETH_NODE_URL)

const adminWallet = new ethers.Wallet(environment.ADMIN_WALLET_PRIVATE_KEY,provider)

const sistemaEleitoraInstance = SistemaEleitoral__factory.connect(environment.SISTEMA_ELEITORAL_CONTRACT_ADDRESS,adminWallet)


export {adminWallet,sistemaEleitoraInstance}