import { NextFunction, Request, Response } from "express";
import { CreateEleitorSchema } from "./CreateEleitorSchema";

export async function validateEleitorRequest(req:Request,res:Response,next:NextFunction){
    try {
        const {cpf,chavePublica} = req.body
        CreateEleitorSchema.parse({cpf,chavePublica})
        return next()
    } catch (error:any) {
        console.error(error)
        return res.status(422).json({message:"Requisição inválida"})
        
    }
}