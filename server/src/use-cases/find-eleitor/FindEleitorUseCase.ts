import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { IFindEleitorRequestDTO } from "./FindEleitorRequestDTO";

export class FindEleitorUseCase {
  constructor(private eleitorRepository: IEleitorRepository) {}
  async execute(data: IFindEleitorRequestDTO) {
    const eleitor = await this.eleitorRepository.findByCpf(data.cpf);
    if (!eleitor) throw new Error("Eleitor not found");
    return eleitor;
  }
}
