
import { SistemaEleitoralWrapper } from "../../../services/implementations/SistemaEleitoralWrapper";
import { EncerrarEleicaoController } from "./EncerrarEleicaoController";
//import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { EncerrarEleicaoUseCase } from "./EncerrarEleicaoUseCase";

const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
//const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const encerrarEleicaoUseCase = new EncerrarEleicaoUseCase(sistemaEleitoralWrapper)
const encerrarEleicaoController = new EncerrarEleicaoController(encerrarEleicaoUseCase)

export { encerrarEleicaoController, encerrarEleicaoUseCase}