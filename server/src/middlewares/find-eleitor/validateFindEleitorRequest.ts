import {Request,Response,NextFunction} from "express"
import { FindEleitorRequestSchema } from "./FindEleitorRequestSchema"
export async function validateFindEleitorRequest(req:Request,res:Response,next:NextFunction){
    try {
        let value = req.params.cpfOrIdOrChavePublica
        let filter:string | "cpf" | "chavePublica"| "id"
        switch (value.length) {
            case 11:
                filter="cpf"
                break;
            case 42:
                filter="chavePublica"
                break;
            default:
                filter="id"
                break;
        }
        
        FindEleitorRequestSchema.parse({[filter]:value})
        req.params.filter = filter
        req.params.value = value
        return next()
    } catch (error:any) {
        console.error(error)
        return res.status(422).send()
        
    }
}