import { ILoginAsEleitorRepository } from "../ILoginAsEleitorRepository";
import { ethers } from "ethers";
import jwt from "jsonwebtoken"
import { environment } from "../../config/environment";
export class LoginAsEleitorRepository implements ILoginAsEleitorRepository{
    async generateToken(signerPublicKey: string): Promise<string | null> {
        try {
            const payload = {
                chavePublica:signerPublicKey
            }
            return jwt.sign(payload,environment.JWT_SECRET,{expiresIn:"24h"})  
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async verifySignature(signerPublicKey:string,signature: string,timestampInMs:number): Promise<boolean | null> {
        try {
            const FIVE_MINUTES_MILISECONDS = 300000
            const now =Date.now()
            if(now-timestampInMs>FIVE_MINUTES_MILISECONDS) return null
            const message = `Login Sistema Eleitoral: ${timestampInMs}`
            console.log({message,signature})
            const verifiedSigner = ethers.verifyMessage(message,signature)
            console.log({verifiedSigner})
            if(verifiedSigner.toLowerCase()===signerPublicKey.toLowerCase()){
                return true
            }else{
                return null
            }
        } catch (error) {
            console.error(error)
            return null
        }
    }

}