import { Request ,Response} from "express";
import { EncerrarEleicaoDTO } from "./EncerrarEleicaoDTO";
import { EncerrarEleicaoUseCase } from "./EncerrarEleicaoUseCase";
import { handleErrors } from "../../../errors/handleErrors";


export class EncerrarEleicaoController{
    constructor(private encerrarEleicaoUseCase: EncerrarEleicaoUseCase){}
    async handle(req:Request,res:Response){
        const {anoDaEleicao} = req.body as EncerrarEleicaoDTO
        try{
            const transactionHash = await this.encerrarEleicaoUseCase.execute({anoDaEleicao})
            return res.status(200).json({transactionHash})
        }catch(error){
            return handleErrors(error,res)
        }
    }
}