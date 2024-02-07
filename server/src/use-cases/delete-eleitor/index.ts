import EleitorRepositoryMongoDB from "../../repositories/implementations/EleitorRepositoryMongoDB";

import DeleteEleitorController from "./DeleteEleitorController";

import DeleteEleitorUseCase from "./DeleteEleitorUseCase";

const eleitorRepositoryMongoDb = new EleitorRepositoryMongoDB()

const deleteEleitorUseCase = new DeleteEleitorUseCase(eleitorRepositoryMongoDb)

const deleteEleitorController = new DeleteEleitorController(deleteEleitorUseCase)

export {deleteEleitorController,deleteEleitorUseCase}