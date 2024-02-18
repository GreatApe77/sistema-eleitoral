import { ApiError } from "../../errors/ApiError";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { IDeleteEleitorRequestDTO } from "./DeleteEleitorDTO";

export default class DeleteEleitorUseCase{
    private eleitorRepository: IEleitorRepository;

    constructor(eleitorRepository: IEleitorRepository){
        this.eleitorRepository = eleitorRepository;
    }

    async execute(data:IDeleteEleitorRequestDTO){
        const deleted = await this.eleitorRepository.delete(data.cpf)
        if(deleted==null) throw new ApiError("Erro ao tentar deletar eleitor",500)
        if(deleted==false) throw new ApiError("Eleitor Não encontrado",404)
        return deleted
    }
}