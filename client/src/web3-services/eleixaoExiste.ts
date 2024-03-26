import { ethers } from "ethers";
import { sistemaEleitoralInstance } from "./smart-contract-connection";


export async function eleicaoExiste(anoDaEleicao:bigint| string | number){
    const exists = await sistemaEleitoralInstance.eleicao(anoDaEleicao)
    return exists !== ethers.ZeroAddress
}