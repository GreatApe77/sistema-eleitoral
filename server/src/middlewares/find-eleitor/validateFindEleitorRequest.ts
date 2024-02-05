import {Request,Response,NextFunction} from "express"
import { FindEleitorRequestSchema } from "./FindEleitorRequestSchema"
export async function validateFindEleitorRequest(req:Request,res:Response,next:NextFunction){
    try {
        const cpf = req.params.cpf
        FindEleitorRequestSchema.parse({cpf})
        return next()
    } catch (error:any) {
        console.error(error)
        return res.status(422).send()
        
    }
}