export interface ISistemaEleitoralRepository {
    anexarEleicao(anoDaEleicao: string,enderecoDeContrato:string): Promise<string | null>
    getEleicaoAddress(anoDaEleicao: string): Promise<string | null>
}