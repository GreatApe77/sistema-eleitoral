import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";
import CreateEleitorController from "./CreateEleitorController";
import { CreateEleitorUseCase } from "./CreateEleitorUseCase";


const eleitorRepositoryMongoDb = new EleitorRepositoryMongoDB()

const createEleitorUseCase = new CreateEleitorUseCase(eleitorRepositoryMongoDb)


const createEleitorController = new CreateEleitorController(createEleitorUseCase)

export {createEleitorController,createEleitorUseCase}