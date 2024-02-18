import { Domain } from "../types/Domain"
import { StatusDaEleicao } from "../types/StatusDaEleicao"

export interface ISistemaEleitoralRepository {
    anexarEleicao(anoDaEleicao: string,enderecoDeContrato:string): Promise<string | null>
    getEleicaoAddress(anoDaEleicao: string): Promise<string | null>
    iniciarEleicao(anoDaEleicao: string): Promise<string | null>
    encerrarEleicao(anoDaEleicao: string): Promise<string | null>
    getEleicaoStatus(anoDaEleicao: string): Promise<StatusDaEleicao | null>
    anexarEleitores(anoDaEleicao: string,eleitores:string[]): Promise<string | null>
    removerEleitores(anoDaEleicao: string,eleitores:string[]): Promise<string | null>
    votar(anoDaEleicao:string,chavePublica:string,numeroDoCandidato:string,timestamp:number,signature:string): Promise<string | null>
    getDomain(): Promise<Domain | null>
    getNonce(chavePublica:string): Promise<number | null>
    getPermissaoDeVoto(anoDaEleicao:string,chavePublica:string): Promise<boolean | null>
}