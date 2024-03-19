import { StatusDaEleicao } from "../../types/StatusDaEleicao"
import { Domain } from "../../types/Domain"
import { ICandidato } from "../../models/interfaces/ICandidato"
export interface ISistemaEleitoralWrapper {
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
    cadastrarCandidato(anoDeEleicao:number,candidato:ICandidato): Promise<string>
}