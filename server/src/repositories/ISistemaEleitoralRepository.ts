import { StatusDaEleicao } from "../types/StatusDaEleicao"

export interface ISistemaEleitoralRepository {
    anexarEleicao(anoDaEleicao: string,enderecoDeContrato:string): Promise<string | null>
    getEleicaoAddress(anoDaEleicao: string): Promise<string | null>
    iniciarEleicao(anoDaEleicao: string): Promise<string | null>
    encerrarEleicao(anoDaEleicao: string): Promise<string | null>
    getEleicaoStatus(anoDaEleicao: string): Promise<StatusDaEleicao | null>
    anexarEleitores(anoDaEleicao: string,eleitores:string[]): Promise<string | null>
    removerEleitores(anoDaEleicao: string,eleitores:string[]): Promise<string | null>
}