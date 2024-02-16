import { sistemaEleitoraInstance } from "./config"

export async function encerrarEleicao(anoDaEleicao: string) {
    const response = await sistemaEleitoraInstance.encerrarEleicao(anoDaEleicao)
    return response.hash
}