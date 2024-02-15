import { Candidato } from "../types/Candidato";
import { sistemaEleitoralInstance } from "./smart-contract-connection";


/**
 *   uint256 anoDeEleicao,
        uint256 indiceDePartida,
        uint256 quantidade
 */
export async function getCandidatos(anoDeEleicao: string, indiceDePartida: number, quantidade: number){
    try {
        const candidatos = await sistemaEleitoralInstance.getCandidatos(anoDeEleicao, indiceDePartida, quantidade)
        return candidatos.map((candidato)=>{
            return {
              fotoDoCandidatoUrl: candidato.fotoDoCandidatoUrl,
              nome: candidato.nome,
              indice: Number(candidato.indice),
              partido: candidato.partido,
              numeroDeVotacao: Number(candidato.numeroDeVotacao),
              quantidadeDeVotos: Number(candidato.quantidadeDeVotos),
  
            } as Candidato
          })    
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar candidatos")
    }
    
}