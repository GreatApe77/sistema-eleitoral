import Eleitor from "../models/Eleitor"
export interface IEleitorRepository{
    findByCpf(cpf:string):Promise<Eleitor | null>
    findByChavePublica(chavePublica:string):Promise<Eleitor | null>
    find(filter:string,filterValue:string):Promise<Eleitor| null>
    save(eleitor:Eleitor):Promise<void>
    update(id:string,eleitor:Eleitor):Promise<void>
    delete(cpf:string):Promise<void>
}