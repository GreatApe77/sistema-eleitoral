import { Candidato } from "../models/Candidato";

export interface IEleicaoRepository {
    deployNewEleicao(anoDaEleicao:string,candidatosIniciais:Candidato[]): Promise<string>

}