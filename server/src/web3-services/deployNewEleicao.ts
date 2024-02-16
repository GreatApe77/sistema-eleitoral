import {ethers} from "ethers"
import {bytecode} from "./eleicao-bytecode.json"
import { Eleicao__factory } from "../typechain-types"
import { adminWallet } from "./config"
import { Candidato } from "../models/Candidato"
import { environment } from "../config/environment"


export async function deployNewEleicao(anoDaEleicao:string,candidatosIniciais:Candidato[]){
    const eleicaoFactory = new ethers.ContractFactory(Eleicao__factory.abi,bytecode,adminWallet)
    console.log(candidatosIniciais)
    const eleicao = await eleicaoFactory.deploy(anoDaEleicao,environment.SISTEMA_ELEITORAL_CONTRACT_ADDRESS,candidatosIniciais)
    await eleicao.waitForDeployment()
    return Eleicao__factory.connect(await eleicao.getAddress(),adminWallet)
    
}

