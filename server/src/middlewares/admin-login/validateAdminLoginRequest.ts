import { Request, Response, NextFunction } from "express"
export async function validateAdminLoginRequest(req: Request, res: Response, next: NextFunction) {
    const { ultraSecretPassword } = req.body
    //if (!ultraSecretPassword) return res.status(422).json("ultraSecretPassword is required")
    if (typeof ultraSecretPassword !== "string") return res.status(422).json({message:"Requisição inválida"})
    next()
    
}