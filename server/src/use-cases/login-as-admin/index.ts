import { LoginAsAdminController } from "./LoginAsAdminController";
import { LoginAsAdminUseCase } from "./LoginAsAdminUseCase";
import  {LoginAsAdminRepository}  from "../../repositories/implementations/LoginAsAdminRepository";

const loginAsAdminRepository = new LoginAsAdminRepository()

const loginAsAdminUseCase = new LoginAsAdminUseCase(loginAsAdminRepository)

const loginAsAdminController = new LoginAsAdminController(loginAsAdminUseCase)

export {loginAsAdminUseCase,loginAsAdminController}