//import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { SistemaEleitoralWrapper } from "../../services/implementations/SistemaEleitoralWrapper";
import { IniciarEleicaoController } from "./IniciarEleicaoController";
import { IniciarEleicaoUseCase } from "./IniciarEleicaoUseCase";
const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
//const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const iniciarEleicaoUseCase = new IniciarEleicaoUseCase(sistemaEleitoralWrapper)
const iniciarEleicaoController = new IniciarEleicaoController(iniciarEleicaoUseCase)

export { iniciarEleicaoController }