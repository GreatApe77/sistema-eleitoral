import { ILoginAsEleitorRepository } from "../ILoginAsEleitorRepository";
import { ethers } from "ethers";
export class LoginAsEleitorRepository implements ILoginAsEleitorRepository{
    generateToken(signerPublicKey: string): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    async verifySignature(signerPublicKey:string,signature: string,timestampInMs:number): Promise<boolean | null> {
        try {
            const FIVE_MINUTES_MILISECONDS = 30000
            const now =Date.now()
            if(now-timestampInMs>FIVE_MINUTES_MILISECONDS) return null
            const verifiedSigner = ethers.verifyMessage(`Fazer Login no Sistema Eleitoral.Timestamp:${timestampInMs}`,signature)
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