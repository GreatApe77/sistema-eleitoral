import { Candidato } from "../../../models/Candidato"


export interface IConfigureEleicaoDTO {
    anoDaEleicao:string
    candidatosIniciais:Candidato[]
}