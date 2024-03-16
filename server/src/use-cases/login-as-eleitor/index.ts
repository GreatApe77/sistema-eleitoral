import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";
import { LoginAsEleitorUseCase } from "./LoginAsEleitorUseCase";
import { LoginAsEleitorController } from "./LoginAsEleitorController";
import { EleitorAuthService } from "../../services/implementations/EleitorAuthService";

const eleitorRepository = new EleitorRepositoryMongoDB()
const eleitorAuthService = new EleitorAuthService(eleitorRepository)
const loginAsEleitorUseCase = new LoginAsEleitorUseCase(eleitorAuthService,eleitorRepository)
const loginAsEleitorController = new LoginAsEleitorController(loginAsEleitorUseCase)

export { loginAsEleitorUseCase,loginAsEleitorController }