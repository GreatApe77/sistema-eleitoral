import { EncerrarEleicaoController } from "./EncerrarEleicaoController";
import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { EncerrarEleicaoUseCase } from "./EncerrarEleicaoUseCase";


const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const encerrarEleicaoUseCase = new EncerrarEleicaoUseCase(sistemaEleitoralRepository)
const encerrarEleicaoController = new EncerrarEleicaoController(encerrarEleicaoUseCase)

export { encerrarEleicaoController, encerrarEleicaoUseCase}