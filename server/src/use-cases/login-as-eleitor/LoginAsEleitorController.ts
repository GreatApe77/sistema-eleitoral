import { LoginAsEleitorUseCase } from "./LoginAsEleitorUseCase";
import { Request,Response } from "express";
export class LoginAsEleitorController{


    constructor(private loginAsEleitorUseCase:LoginAsEleitorUseCase){}


    async handle(req:Request,res:Response){
        const {signature,chavePublica,timeStampInMs} = req.body
        console.log(req.body)
        try {
            const token = await this.loginAsEleitorUseCase.execute({
                publicKey:chavePublica,
                signature,
                timeStampInMs
            })
            if(!token) return res.status(401).json("Could not login as eleitor")
            return res.status(200).json({token})    
        } catch (error) {
            console.error(error)
            return res.status(500).json("Internal server error")
        }
        
    }
}