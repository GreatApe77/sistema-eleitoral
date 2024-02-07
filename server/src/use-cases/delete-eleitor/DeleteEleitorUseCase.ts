import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { IDeleteEleitorRequestDTO } from "./DeleteEleitorDTO";

export default class DeleteEleitorUseCase{
    private eleitorRepository: IEleitorRepository;

    constructor(eleitorRepository: IEleitorRepository){
        this.eleitorRepository = eleitorRepository;
    }

    async execute(data:IDeleteEleitorRequestDTO){
        const deleted = await this.eleitorRepository.delete(data.cpf)
        return deleted
    }
}