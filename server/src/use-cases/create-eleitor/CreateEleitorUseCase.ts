import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { ICreateEleitorRequestDTO } from "./CreateEleitorDTO";

export class CreateEleitorUseCase {
    private eleitorRepository:IEleitorRepository
    constructor(
        eleitorRepository:IEleitorRepository
    ){
        this.eleitorRepository = eleitorRepository
    }

    async execute(data:ICreateEleitorRequestDTO){
        const alreadyExists = await this.eleitorRepository.findByCpf(data.cpf)
        if(alreadyExists) throw new Error('Eleitor already exists')
        const eleitor = new Eleitor(data)
        await this.eleitorRepository.save(eleitor)
    }
}