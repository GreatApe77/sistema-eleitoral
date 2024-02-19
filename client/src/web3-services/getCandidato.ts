import { Candidato } from "../types/Candidato";
import { sistemaEleitoralInstance } from "./smart-contract-connection";

export async function getCandidato(anoDaEleicao:string,numero: string) {
    const candidato = await sistemaEleitoralInstance.candidatoPorNumero(anoDaEleicao,numero)
    return {
        fotoDoCandidatoUrl: candidato.fotoDoCandidatoUrl,
        nome: candidato.nome,
        indice: Number(candidato.indice),
        partido: candidato.partido,
        numeroDeVotacao: Number(candidato.numeroDeVotacao),
        quantidadeDeVotos: Number(candidato.quantidadeDeVotos),
    } as Candidato
    
  
}