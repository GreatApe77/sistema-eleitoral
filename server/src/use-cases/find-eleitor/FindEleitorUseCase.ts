import { ApiError } from "../../errors/ApiError";
import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { IFindEleitorRequestDTO } from "./FindEleitorRequestDTO";

export class FindEleitorUseCase {
  constructor(private eleitorRepository: IEleitorRepository) {}
  async execute(data: IFindEleitorRequestDTO) {
    const {filter,value} = data
    
    const eleitor = await this.eleitorRepository.find([{filterKey:filter,filterValue:value}])
    if (!eleitor) throw new ApiError("Eleitor not found",404);
    return eleitor;
  }
}
