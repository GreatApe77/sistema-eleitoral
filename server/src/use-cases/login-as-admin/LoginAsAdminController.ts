import { Request, Response } from "express";
import { LoginAsAdminUseCase } from "./LoginAsAdminUseCase";
import { handleErrors } from "../../errors/handleErrors";

export class LoginAsAdminController{

    constructor(private loginAsAdminUseCase:LoginAsAdminUseCase){}


    async handle(req:Request,res:Response){
        const { ultraSecretPassword } = req.body
        try {
            const token =  this.loginAsAdminUseCase.execute({ultraSecretPassword})
            return res.status(200).json({token})
        } catch (error) {
            return handleErrors(error,res)
        }
    }
}