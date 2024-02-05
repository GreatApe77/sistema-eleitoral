export interface IFindEleitorRequestDTO{
    filter:string|"cpf" | "chavePublica"| "id",
    value:string
    
}