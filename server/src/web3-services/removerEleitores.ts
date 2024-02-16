import { sistemaEleitoraInstance } from "./config"

export async function removerEleitores(anoDaEleicao: string, eleitores: string[]): Promise<string> {
    const response = await sistemaEleitoraInstance.retiraAprovacaoDeEleitores(anoDaEleicao, eleitores)
    return response.hash
}