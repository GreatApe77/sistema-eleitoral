import { Request ,Response} from "express";
import { EncerrarEleicaoDTO } from "./EncerrarEleicaoDTO";
import { EncerrarEleicaoUseCase } from "./EncerrarEleicaoUseCase";

export class EncerrarEleicaoController{
    constructor(private encerrarEleicaoUseCase: EncerrarEleicaoUseCase){}
    async handle(req:Request,res:Response){
        const {anoDaEleicao} = req.body
        try{
            await this.encerrarEleicaoUseCase.execute({anoDaEleicao})
            return res.status(200).send()
        }catch(error:any){
            return res.status(error.statusCode).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}