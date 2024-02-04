import Eleitor from "../models/Eleitor"
export interface IEleitorRepository{
    findByCpf(cpf:string):Promise<Eleitor>
    save(eleitor:Eleitor):Promise<void>
}