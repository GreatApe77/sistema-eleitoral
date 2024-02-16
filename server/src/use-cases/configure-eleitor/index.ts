import { ConfigureEleitorController } from "./ConfigureEleitorController";
import { ConfigureEleitorUseCase } from "./ConfigureEleitorUseCase";
import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";
import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository";

const eleitorRepository = new EleitorRepositoryMongoDB()
const sistemaEleitoralRepository = new SistemaEleitoralRepository()

const configureEleitorUseCase = new ConfigureEleitorUseCase(sistemaEleitoralRepository,eleitorRepository)
const configureEleitorController = new ConfigureEleitorController(configureEleitorUseCase)

export { configureEleitorUseCase, configureEleitorController }