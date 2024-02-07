import { NextFunction, Request, Response } from "express";
import { DeleteEleitorRequestSchema } from "./DeleteEleitorRequestSchema";

export async function validateDeleteEleitorRequest(req:Request,res:Response,next:NextFunction){
    try {
        const {cpf} = req.params
        DeleteEleitorRequestSchema.parse({cpf})
        return next()
    } catch (error:any) {
        console.error(error)
        return res.status(422).send()
        
    }
}