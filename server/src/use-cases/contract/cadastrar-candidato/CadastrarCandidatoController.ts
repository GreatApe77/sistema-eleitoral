
import { handleErrors } from "../../../errors/handleErrors";
import { CadastrarCandidatoDTO } from "./CadastrarCandidatoDTO";
import { CadastrarCandidatoUseCase } from "./CadastrarCandidatoUseCase";
import { Request,Response } from "express";
export class CadastrarCandidatoController{

    constructor(private readonly cadastrarCandidatoUseCase:CadastrarCandidatoUseCase){}
    async handle(req:Request,res:Response){
        const data = req.body as CadastrarCandidatoDTO
        try {
            const transactionHash = await this.cadastrarCandidatoUseCase.execute(data)
            return res.status(201).json({
                transactionHash:transactionHash
            })
        } catch (error) {
            
            return handleErrors(error,res)
        }
    }
}