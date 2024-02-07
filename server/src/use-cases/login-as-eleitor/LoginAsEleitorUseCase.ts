import { ILoginAsEleitorRepository } from "../../repositories/ILoginAsEleitorRepository";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { ILoginAsEleitorDTO } from "./LoginAsEleitorDTO";
export class LoginAsEleitorUseCase{


    constructor(private loginAsEleitorRepository:ILoginAsEleitorRepository,private eleitorRepository:IEleitorRepository){

    }


    async execute(data:ILoginAsEleitorDTO){
        const {publicKey,signature,timeStampInMs} = data

        const eleitor = await this.eleitorRepository.findByChavePublica(publicKey)
        if(!eleitor) return null
        const signatureMatches = await this.loginAsEleitorRepository.verifySignature(publicKey,signature,timeStampInMs)
        if(!signatureMatches) return null
        const token = await this.loginAsEleitorRepository.generateToken(publicKey)
        if(!token) return null
        return token
    }
}