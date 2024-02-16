import { Request,Response,NextFunction } from "express";
import { ConfigureEleitorRequestSchema } from "./ConfigureEleitorRequestSchema";


export async function validateConfigureEleitor(req: Request, res: Response, next: NextFunction) {
    try {
        ConfigureEleitorRequestSchema.parse(req.body)
        return next()
    } catch (error) {
        console.error(error)
        return res.status(422).json({message:"Requisição inválida"})
    }
}