import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { VotarController } from "./VotarController";
import { VotarUseCase } from "./VotarUseCase";

const sistemaEleitoralRepository = new SistemaEleitoralRepository();
const votarUseCase = new VotarUseCase(sistemaEleitoralRepository);
const votarController = new VotarController(votarUseCase);

export { votarUseCase, votarController };
