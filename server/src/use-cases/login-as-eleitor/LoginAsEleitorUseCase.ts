import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { ILoginAsEleitorDTO } from "./LoginAsEleitorDTO";
import { ApiError } from "../../errors/ApiError";
import { IEleitorAuthService } from "../../services/interfaces/IEleitorAuthService";
export class LoginAsEleitorUseCase{


    constructor(private eleitorAuthService:IEleitorAuthService,private eleitorRepository:IEleitorRepository){

    }


    async execute(data:ILoginAsEleitorDTO){
        const {publicKey,signature,timestampInMs} = data

        const eleitor = await this.eleitorRepository.findByChavePublica(publicKey)
        if(!eleitor) throw new ApiError("Eleitor não Cadastrado",404)
        const signatureMatches =  this.eleitorAuthService.verifySignature(publicKey,signature,timestampInMs)
        if(!signatureMatches)  throw new ApiError("Assinatura inválida",400)
        const token =  this.eleitorAuthService.generateToken(publicKey)
        //if(!token) throw new ApiError("Erro ao gerar token",500) 
        return token
    }
}