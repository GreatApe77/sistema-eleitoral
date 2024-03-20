import { SistemaEleitoralWrapper } from "../../services/implementations/SistemaEleitoralWrapper";
import { CadastrarCandidatoController } from "./CadastrarCandidatoController";
import { CadastrarCandidatoUseCase } from "./CadastrarCandidatoUseCase";


const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
const cadastrarCandidatoUseCase = new CadastrarCandidatoUseCase(sistemaEleitoralWrapper)
const cadastrarCandidatoController = new CadastrarCandidatoController(cadastrarCandidatoUseCase)

export {cadastrarCandidatoController}