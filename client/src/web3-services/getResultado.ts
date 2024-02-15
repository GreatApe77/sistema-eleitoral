import { Votos } from "../types/Votos"
import { sistemaEleitoralInstance } from "./smart-contract-connection"


export async function getResultado(anoDaEleicao:string){

    try {
        const resultado = await sistemaEleitoralInstance.resultado(anoDaEleicao)
        return {
            quantidadeDeVotos:Number(resultado.quantidadeDeVotos),
            quantidadeDeVotosBrancos:Number(resultado.quantidadeDeVotosBrancos),
            quantidadeDeVotosNulos:Number(resultado.quantidadeDeVotosNulos),
            quantidadeDeVotosValidos:Number(resultado.quantidadeDeVotosValidos)
        } as Votos
    } catch (error) {
        throw new Error("Erro ao buscar resultados da eleição")
    }

}