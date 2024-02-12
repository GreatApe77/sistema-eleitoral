import {ethers} from "ethers"
import {bytecode} from "./eleicao-bytecode.json"
import { Eleicao__factory } from "../typechain-types"
import { adminWallet } from "./config"
import { Candidato } from "../models/Candidato"


export async function deployNewEleicao(anoDaEleicao:string,candidatosIniciais:Candidato[]){
    const eleicaoFactory = new ethers.ContractFactory(Eleicao__factory.abi,bytecode,adminWallet)
    console.log(candidatosIniciais)
    const eleicao = await eleicaoFactory.deploy(anoDaEleicao,adminWallet.address,candidatosIniciais)
    await eleicao.waitForDeployment()
    return Eleicao__factory.connect(await eleicao.getAddress(),adminWallet)
    
}

