import { ICandidato } from "../models/interfaces/ICandidato";
import { sistemaEleitoraInstance } from "./config";

export async function cadastrarCandidatos(anoDeEleicao:number,candidato:ICandidato){
    const response = await sistemaEleitoraInstance.cadastrarCandidato(anoDeEleicao,candidato)
    return response.hash
}