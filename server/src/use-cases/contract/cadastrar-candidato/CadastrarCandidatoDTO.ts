import { ICandidato } from "../../../models/interfaces/ICandidato"


export interface CadastrarCandidatoDTO{
    anoDaEleicao:number
    candidato: Omit<ICandidato,"quantidadeDeVotos" | "indice">
}