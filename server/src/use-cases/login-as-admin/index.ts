import { AdminAuthService } from "../../services/implementations/AdminAuthService";
import { LoginAsAdminController } from "./LoginAsAdminController";
import { LoginAsAdminUseCase } from "./LoginAsAdminUseCase";
//import  {LoginAsAdminRepository}  from "../../repositories/implementations/LoginAsAdminRepository";

//const loginAsAdminRepository = new LoginAsAdminRepository()
const adminAuthservice = new AdminAuthService()
const loginAsAdminUseCase = new LoginAsAdminUseCase(adminAuthservice)

const loginAsAdminController = new LoginAsAdminController(loginAsAdminUseCase)

export {loginAsAdminUseCase,loginAsAdminController}