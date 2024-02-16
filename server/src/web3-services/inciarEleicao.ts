import { sistemaEleitoraInstance } from "./config";


export async function iniciarEleicao(anoDaEleicao:string) {
    
    const response = await sistemaEleitoraInstance.iniciarEleicao(anoDaEleicao)
    return response.hash
}