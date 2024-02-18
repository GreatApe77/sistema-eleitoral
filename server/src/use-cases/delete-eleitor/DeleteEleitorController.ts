import { Request,Response } from "express";
import DeleteEleitorUseCase from "./DeleteEleitorUseCase";
import { handleErrors } from "../../errors/handleErrors";

export default class DeleteEleitorController{


    constructor(private deleteEleitorUseCase:DeleteEleitorUseCase){}

    async handle(req:Request,res:Response){
        const {cpf} = req.params
        try {
            await this.deleteEleitorUseCase.execute({cpf})
            return res.status(200).send()
        } catch (error) {
            handleErrors(error,res)
        } 
        /* const {cpf} = req.params
        try {
            const deleted = await this.deleteEleitorUseCase.execute({cpf})
            if(deleted){
                return res.status(200).send()
            }
            return res.status(400).send()
        } catch (error:any) {
            console.error(error)
            return res.status(500).json({
                message:error.message || 'Unexpected error'
            })
        } */
    }
}