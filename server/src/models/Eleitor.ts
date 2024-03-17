import { v4 as uuidv4 } from "uuid";
import { IEleitor } from "./interfaces/IEleitor";
export default class Eleitor implements IEleitor {
    public  id:string
    public chavePublica: string;
    public cpf: string;

    constructor(props:Omit<Eleitor,"id">,id?:string){
        this.chavePublica = props.chavePublica;
        this.cpf = props.cpf;
        id? this.id = id : this.id = uuidv4();
    }
}


