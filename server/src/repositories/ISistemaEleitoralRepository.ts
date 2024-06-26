import { Domain } from "../types/Domain"
import { StatusDaEleicao } from "../types/StatusDaEleicao"

export interface ISistemaEleitoralRepository {
    anexarEleicao(anoDaEleicao: string,enderecoDeContrato:string): Promise<string>
    getEleicaoAddress(anoDaEleicao: string): Promise<string | null>
    iniciarEleicao(anoDaEleicao: string): Promise<string>
    encerrarEleicao(anoDaEleicao: string): Promise<string>
    getEleicaoStatus(anoDaEleicao: string): Promise<StatusDaEleicao >
    anexarEleitores(anoDaEleicao: string,eleitores:string[]): Promise<string >
    removerEleitores(anoDaEleicao: string,eleitores:string[]): Promise<string >
    votar(anoDaEleicao:string,chavePublica:string,numeroDoCandidato:string,timestamp:number,signature:string): Promise<string>
    getDomain(): Promise<Domain >
    getNonce(chavePublica:string): Promise<number >
    getPermissaoDeVoto(anoDaEleicao:string,chavePublica:string): Promise<boolean>
}