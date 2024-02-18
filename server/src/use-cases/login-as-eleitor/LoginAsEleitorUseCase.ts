import { ILoginAsEleitorRepository } from "../../repositories/ILoginAsEleitorRepository";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { ILoginAsEleitorDTO } from "./LoginAsEleitorDTO";
import { ApiError } from "../../errors/ApiError";
export class LoginAsEleitorUseCase{


    constructor(private loginAsEleitorRepository:ILoginAsEleitorRepository,private eleitorRepository:IEleitorRepository){

    }


    async execute(data:ILoginAsEleitorDTO){
        const {publicKey,signature,timestampInMs} = data

        const eleitor = await this.eleitorRepository.findByChavePublica(publicKey)
        if(!eleitor) throw new ApiError("Eleitor não Cadastrado",404)
        const signatureMatches = await this.loginAsEleitorRepository.verifySignature(publicKey,signature,timestampInMs)
        if(!signatureMatches)  throw new ApiError("Assinatura inválida",400)
        const token = await this.loginAsEleitorRepository.generateToken(publicKey)
        if(!token) throw new ApiError("Erro ao gerar token",500) 
        return token
    }
}