//import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";

import { SistemaEleitoralWrapper } from "../../../services/implementations/SistemaEleitoralWrapper";
import { VotarController } from "./VotarController";
import { VotarUseCase } from "./VotarUseCase";
const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
//const sistemaEleitoralRepository = new SistemaEleitoralRepository();
const votarUseCase = new VotarUseCase(sistemaEleitoralWrapper);
const votarController = new VotarController(votarUseCase);

export { votarUseCase, votarController };
