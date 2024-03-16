import { ConfigureEleitorController } from "./ConfigureEleitorController";
import { ConfigureEleitorUseCase } from "./ConfigureEleitorUseCase";
import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";
//import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";
import { SistemaEleitoralWrapper } from "../../services/implementations/SistemaEleitoralWrapper";
const eleitorRepository = new EleitorRepositoryMongoDB()
//const sistemaEleitoralRepository = new SistemaEleitoralRepository()
const sistemaEleitoralWrapper = new SistemaEleitoralWrapper()
const configureEleitorUseCase = new ConfigureEleitorUseCase(sistemaEleitoralWrapper,eleitorRepository)
const configureEleitorController = new ConfigureEleitorController(configureEleitorUseCase)

export { configureEleitorUseCase, configureEleitorController }