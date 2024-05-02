import { Request, Response } from "express";
import { sistemaEleitoraInstance } from "../../web3-services/config";
import { isAvaibleMethod } from "../../utils/isAvaiableMethod";
import { ApiError } from "../../errors/ApiError";


export class SistemaEleitoralController{
// /contract/call?method=nomeDoMetodo    
    async handle(req:Request,res:Response){
        const method = req.query.method
        if(!isAvaibleMethod.get(method?.toString()!)){
            throw new ApiError(`Invalid method ${method}`,404)
            
        }
        
    }
}