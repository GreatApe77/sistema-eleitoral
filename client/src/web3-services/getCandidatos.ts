import { sistemaEleitoralInstance } from "./smart-contract-connection";


/**
 *   uint256 anoDeEleicao,
        uint256 indiceDePartida,
        uint256 quantidade
 */
export async function getCandidatos(anoDeEleicao: string, indiceDePartida: number, quantidade: number){
    try {
        const candidatos = await sistemaEleitoralInstance.getCandidatos(anoDeEleicao, indiceDePartida, quantidade)
        return candidatos    
    } catch (error) {
        console.error(error)
        throw new Error("Erro ao buscar candidatos")
    }
    
}