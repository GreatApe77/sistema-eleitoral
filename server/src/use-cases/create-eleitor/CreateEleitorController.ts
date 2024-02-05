import { Request,Response } from "express";
import { CreateEleitorUseCase } from "./CreateEleitorUseCase";

export default class CreateEleitorController{

    constructor(
        private createEleitorUseCase:CreateEleitorUseCase
    ){

    }
    async handle(req:Request,res:Response):Promise<Response>{
        const {chavePublica,cpf} = req.body
        try {
            
            await this.createEleitorUseCase.execute({chavePublica,cpf})
            return res.status(201).send()
        } catch (error:any) {
            console.error(error)
            return res.status(400).json({
                message:error.message || 'Unexpected error'
            })
        }
    }
}