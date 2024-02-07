import { Request, Response } from "express";
import { LoginAsAdminUseCase } from "./LoginAsAdminUseCase";

export class LoginAsAdminController{

    constructor(private loginAsAdminUseCase:LoginAsAdminUseCase){}


    async handle(req:Request,res:Response){
        const { ultraSecretPassword } = req.body
        try {
            const token = await this.loginAsAdminUseCase.execute({ultraSecretPassword})
            if(!token) return res.status(401).send()
            return res.status(200).json({token})
        } catch (error) {
            return res.status(400).send()
        }
    }
}