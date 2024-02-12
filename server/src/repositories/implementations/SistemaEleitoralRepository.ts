import { ethers } from "ethers";
import { sistemaEleitoraInstance } from "../../web3-services/config";
import { ISistemaEleitoralRepository } from "../ISistemaEleitoralRepository";

export class SistemaEleitoralRepository implements ISistemaEleitoralRepository{
    async getEleicaoAddress(anoDaEleicao: string): Promise<string | null> {
        try {
            const endereco = await sistemaEleitoraInstance.eleicao(anoDaEleicao)
            if(endereco===ethers.ZeroAddress) return null

                return endereco
            
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async anexarEleicao(anoDaEleicao: string, enderecoDeContrato: string): Promise<string> {
        try {
            const transactionResponse = await sistemaEleitoraInstance.anexarEleicao(anoDaEleicao,enderecoDeContrato)
            return transactionResponse.hash
        } catch (error) {
            console.error(error)
            throw new Error("Erro ao anexar eleição")
        }
    }
    

}