import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import {  IUpdateEleitorRequestDTO} from "./UpdateEleitorRequestDTO";

export class UpdateEleitorUseCase {
  constructor(private eleitorRepository: IEleitorRepository) {}
  async execute(data: IUpdateEleitorRequestDTO) {
    const eleitor = await this.eleitorRepository.update(data)
    if (!eleitor) throw new Error("Eleitor not found");
    return eleitor;
  }
}
