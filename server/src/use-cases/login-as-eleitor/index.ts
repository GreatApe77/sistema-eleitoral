import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";
import { LoginAsEleitorRepository } from "../../repositories/implementations/LoginAsEleitorRepository";
import { LoginAsEleitorUseCase } from "./LoginAsEleitorUseCase";
import { LoginAsEleitorController } from "./LoginAsEleitorController";

const eleitorRepository = new EleitorRepositoryMongoDB()
const loginAsEleitorRepository = new LoginAsEleitorRepository()
const loginAsEleitorUseCase = new LoginAsEleitorUseCase(loginAsEleitorRepository,eleitorRepository)
const loginAsEleitorController = new LoginAsEleitorController(loginAsEleitorUseCase)

export { loginAsEleitorUseCase,loginAsEleitorController }