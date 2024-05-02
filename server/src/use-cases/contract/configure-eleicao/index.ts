
//import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { EleicaoRepository } from "../../../repositories/implementations/EleicaoRepository";
import { SistemaEleitoralWrapper } from "../../../services/implementations/SistemaEleitoralWrapper";
import { ConfigureEleicaoController } from "./ConfigureEleicaoController";
import { ConfigureEleicaoUseCase } from "./ConfigureEleicaoUseCase";
const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
const eleicaoRepository = new EleicaoRepository()
//const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const configureEleicaoUseCase = new ConfigureEleicaoUseCase(eleicaoRepository,sistemaEleitoralWrapper)
const configureEleicaoController = new ConfigureEleicaoController(configureEleicaoUseCase)


export { configureEleicaoUseCase,configureEleicaoController }