import { handleErrors } from "../../errors/handleErrors";
import { LoginAsEleitorUseCase } from "./LoginAsEleitorUseCase";
import { Request,Response } from "express";
export class LoginAsEleitorController{


    constructor(private loginAsEleitorUseCase:LoginAsEleitorUseCase){}


    async handle(req:Request,res:Response){
        const {signature,chavePublica,timestampInMs} = req.body
        
        try {
            const token = await this.loginAsEleitorUseCase.execute({
                publicKey:chavePublica,
                signature,
                timestampInMs
            })
            
            return res.status(200).json({token})    
        } catch (error) {
           return handleErrors(error,res)
        }
        
    }
}