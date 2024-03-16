import Eleitor from "../models/Eleitor"
import { IEleitor } from "../models/interfaces/IEleitor"
export interface IEleitorRepository{
    findByCpf(cpf:string):Promise<IEleitor | null>
    findByChavePublica(chavePublica:string):Promise<IEleitor | null>
    find(filters:{filterKey:string,filterValue:string}[]):Promise<IEleitor| null>
    save(eleitor:IEleitor):Promise<void>
    update(id:string,eleitor:Eleitor):Promise<void>
    delete(cpf:string):Promise<boolean >
    //entrarEmEleicao(anoDeEleicao:number,eleitor:Eleitor):Promise<string | null>
    //votar(anoDeEleicao:number,numeroDoCandidato:string,assinatura:string):Promise<boolean>
}