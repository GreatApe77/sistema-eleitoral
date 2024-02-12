import { NextFunction, Request, Response } from "express";
import { RequestConfigureEleicaoSchema} from "./RequestConfigureEleicaoSchema";

export async function validateConfigureEleicaoSchema(req:Request,res:Response,next:NextFunction){
    try {
        const {anoDaEleicao,candidatosIniciais} = req.body
        RequestConfigureEleicaoSchema.parse({anoDaEleicao,candidatosIniciais})
        return next()
    } catch (error:any) {
        console.error(error)
        return res.status(422).json({message:"Requisição inválida"})
        
    }
}