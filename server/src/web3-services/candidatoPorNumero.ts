import { ICandidato } from "../models/interfaces/ICandidato";
import { sistemaEleitoraInstance } from "./config";


export async function candidatoPorNumero(anoDaEleicao:number,numeroDeVotacao:number){
    const response = await sistemaEleitoraInstance.candidatoPorNumero(anoDaEleicao,numeroDeVotacao)
    return {
        nome:response.nome,
        fotoDoCandidatoUrl:response.fotoDoCandidatoUrl,
        indice:Number(response.indice),
        numeroDeVotacao:Number(response.numeroDeVotacao),
        partido:response.partido,
        quantidadeDeVotos:Number(response.quantidadeDeVotos)
    } as ICandidato
}