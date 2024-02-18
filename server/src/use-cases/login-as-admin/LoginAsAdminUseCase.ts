import { ApiError } from "../../errors/ApiError";
import { ILoginAsAdminRepository } from "../../repositories/ILoginAsAdminRepository";
import { ILoginAsAdminDTO } from "./LoginAsAdminDTO";

export class LoginAsAdminUseCase{

    constructor(private loginAsAdminRepository:ILoginAsAdminRepository){}


    async execute(data:ILoginAsAdminDTO){

        const {ultraSecretPassword} = data
        const token = await this.loginAsAdminRepository.login(ultraSecretPassword)
        if(!token) throw new ApiError("Senha inválida",401)
        return token
    }
}