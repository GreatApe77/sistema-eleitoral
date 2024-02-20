import { Request, Response, NextFunction } from 'express';
import { RequestSchema } from './RequestSchema';
export async function validateVotar(req: Request, res: Response, next: NextFunction) {
    try {
        RequestSchema.parse(req.body)
        return next()
    } catch (error) {
        return res.status(422).json({message:"Requisição inválida"})
    }
}