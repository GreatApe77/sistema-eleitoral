import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../IEleitorRepository";

export default class EleitorRepositoryMongoDB implements IEleitorRepository{
    findByCpf(cpf: string): Promise<Eleitor> {
        throw new Error("Method not implemented.");
    }
    save(eleitor: Eleitor): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}