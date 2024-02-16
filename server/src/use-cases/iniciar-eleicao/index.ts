import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { IniciarEleicaoController } from "./IniciarEleicaoController";
import { IniciarEleicaoUseCase } from "./IniciarEleicaoUseCase";

const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const iniciarEleicaoUseCase = new IniciarEleicaoUseCase(sistemaEleitoralRepository)
const iniciarEleicaoController = new IniciarEleicaoController(iniciarEleicaoUseCase)

export { iniciarEleicaoController }