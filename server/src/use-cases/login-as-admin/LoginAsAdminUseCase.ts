import { ILoginAsAdminRepository } from "../../repositories/ILoginAsAdminRepository";
import { ILoginAsAdminDTO } from "./LoginAsAdminDTO";

export class LoginAsAdminUseCase{

    constructor(private loginAsAdminRepository:ILoginAsAdminRepository){}


    async execute(data:ILoginAsAdminDTO){

        const {ultraSecretPassword} = data
        const token = await this.loginAsAdminRepository.login(ultraSecretPassword)
        return token
    }
}