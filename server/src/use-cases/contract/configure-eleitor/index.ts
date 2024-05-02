import EleitorRepositoryMongoDB from "../../../repositories/implementations/EleitorRepositoryMongoDB";
import { SistemaEleitoralWrapper } from "../../../services/implementations/SistemaEleitoralWrapper";
import { ConfigureEleitorController } from "./ConfigureEleitorController";
import { ConfigureEleitorUseCase } from "./ConfigureEleitorUseCase";

const eleitorRepository = new EleitorRepositoryMongoDB()
//const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
const configureEleitorUseCase = new ConfigureEleitorUseCase(sistemaEleitoralWrapper,eleitorRepository)
const configureEleitorController = new ConfigureEleitorController(configureEleitorUseCase)

export { configureEleitorUseCase, configureEleitorController }