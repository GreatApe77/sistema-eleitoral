import { Request, Response, NextFunction } from "express"
export function validateEncerrarEleicao(req: Request, res: Response, next: NextFunction) {
    const { anoDaEleicao } = req.body

    if (!anoDaEleicao) {
        return res.status(422).json({message:"Requisição inválida"})
    }

    next()
}