import { StatusDaEleicao } from "../types/StatusDaEleicao"
import { sistemaEleitoralInstance } from "./smart-contract-connection"

export async function getStatus(anoDaEleicao:string){
    try {
        const status = await sistemaEleitoralInstance.statusDaEleicao(anoDaEleicao)
        return Number(status) as StatusDaEleicao
    } catch (error) {
        throw new Error("Erro ao ler Status da Eleição")
    }
}