import { ApiError } from "../../errors/ApiError";
import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { ICreateEleitorRequestDTO } from "./CreateEleitorDTO";

export class CreateEleitorUseCase {
  private eleitorRepository: IEleitorRepository;
  constructor(eleitorRepository: IEleitorRepository) {
    this.eleitorRepository = eleitorRepository;
  }

  async execute(data: ICreateEleitorRequestDTO) {
    const alreadyExists = await this.eleitorRepository.find([
      { filterKey: "chavePublica", filterValue: data.chavePublica },
      { filterKey: "cpf", filterValue: data.cpf },
    ]);
    
    if (alreadyExists) throw new ApiError("Eleitor already exists",400);
    const eleitor = new Eleitor(data);
    await this.eleitorRepository.save(eleitor);
  }
}
