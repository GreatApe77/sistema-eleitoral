import {ethers} from "ethers"
import { SistemaEleitoral__factory } from "../typechain-types"
import { ETH_NODE_URL } from "../constants/ETH_NODE_URL"
import { SISTEMA_ELEITORAL_CONTRACT_ADDRESS } from "../constants/SISTEMA_ELEITORAL_CONTRACT_ADDRESS"



const provider = new ethers.JsonRpcProvider(ETH_NODE_URL)


const sistemaEleitoralInstance = SistemaEleitoral__factory.connect(SISTEMA_ELEITORAL_CONTRACT_ADDRESS,provider)

export {sistemaEleitoralInstance}
