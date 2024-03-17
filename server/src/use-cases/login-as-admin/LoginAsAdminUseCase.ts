import { ApiError } from "../../errors/ApiError";
import { IAdminAuthService } from "../../services/interfaces/IAdminAuthService";
import { ILoginAsAdminDTO } from "./LoginAsAdminDTO";

export class LoginAsAdminUseCase{

    constructor(private adminAuthservice:IAdminAuthService){}


     execute(data:ILoginAsAdminDTO){

        const {ultraSecretPassword} = data
        
        const validPassword = this.adminAuthservice.validatePassword(ultraSecretPassword)
        if(!validPassword)
        throw new ApiError("Administrador invalido",401)
        const token = this.adminAuthservice.generateToken()
        return token
    }
}