import { EleicaoRepository } from "../../repositories/implementations/EleicaoRepository";
import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { ConfigureEleicaoController } from "./ConfigureEleicaoController";
import { ConfigureEleicaoUseCase } from "./ConfigureEleicaoUseCase";

const eleicaoRepository = new EleicaoRepository()
const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const configureEleicaoUseCase = new ConfigureEleicaoUseCase(eleicaoRepository,sistemaEleitoralRepository)
const configureEleicaoController = new ConfigureEleicaoController(configureEleicaoUseCase)


export { configureEleicaoUseCase,configureEleicaoController }