import {ethers} from "ethers"
import {bytecode} from "./eleicao-bytecode.json"
import { Eleicao__factory } from "../typechain-types"
import { adminWallet } from "./config"


export async function deployNewEleicao(){
    const eleicaoFactory = new ethers.ContractFactory(Eleicao__factory.abi,bytecode,adminWallet)
    const eleicao = await eleicaoFactory.deploy(adminWallet.address)
    await eleicao.waitForDeployment()
    return Eleicao__factory.connect(await eleicao.getAddress(),adminWallet)
    
}

deployNewEleicao().then((eleicao)=>{
    console.log("Eleicao deployed at",eleicao.target)
})
.catch((error)=>{
    console.error(error)
    process.exitCode = 1
})
