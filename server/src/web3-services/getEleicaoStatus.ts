import { StatusDaEleicao } from "../types/StatusDaEleicao";
import { sistemaEleitoraInstance } from "./config";

export async function getEleicaoStatus(anoDaEleicao: string): Promise<StatusDaEleicao> {
    
    const status = await sistemaEleitoraInstance.statusDaEleicao(anoDaEleicao)
    return Number(status) as StatusDaEleicao
    
}