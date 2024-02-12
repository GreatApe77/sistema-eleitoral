export interface ISistemaEleitoralRepository {
    anexarEleicao(anoDaEleicao: string,enderecoDeContrato:string): Promise<string | null>
}