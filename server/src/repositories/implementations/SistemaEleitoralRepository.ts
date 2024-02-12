import { sistemaEleitoraInstance } from "../../web3-services/config";
import { ISistemaEleitoralRepository } from "../ISistemaEleitoralRepository";

export class SistemaEleitoralRepository implements ISistemaEleitoralRepository{
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