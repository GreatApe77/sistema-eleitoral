import { ethers } from "ethers";
import { sistemaEleitoraInstance } from "../../web3-services/config";
import { ISistemaEleitoralRepository } from "../ISistemaEleitoralRepository";
import { iniciarEleicao as iniciarEleicaoService } from "../../web3-services/inciarEleicao";
import { encerrarEleicao as encerrarEleicaoService } from "../../web3-services/encerrarEleicao";

export class SistemaEleitoralRepository implements ISistemaEleitoralRepository{
    async iniciarEleicao(anoDaEleicao: string): Promise<string | null> {
        try {
            const transactionHash = await iniciarEleicaoService(anoDaEleicao)
            return transactionHash
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async encerrarEleicao(anoDaEleicao: string): Promise<string | null> {
        try {
            const transactionHash = await encerrarEleicaoService(anoDaEleicao)
            return transactionHash
        } catch (error) {
            console.error(error)
            return null
        }
    }
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