import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";
import FindEleitorController from "./FindEleitorController";
import { FindEleitorUseCase } from "./FindEleitorUseCase";

const eleitorRepositoryMongoDb = new EleitorRepositoryMongoDB()

const findEleitorUseCase = new FindEleitorUseCase(eleitorRepositoryMongoDb)

const findEleitorController = new FindEleitorController(findEleitorUseCase)

export {findEleitorController,findEleitorUseCase}