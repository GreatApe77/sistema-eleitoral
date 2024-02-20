import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { environment } from "../../config/environment";

export async function onlyLoggedEleitor(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token) return res.status(422).json({message:"Token necessário"})
    token = token.split(" ")[1]
    if (typeof token !== "string") return res.status(422).json({message:"Token tem que ser uma string"})
    try {
        const decoded = jwt.verify(token,environment.JWT_SECRET)
        if(typeof decoded === "object" && decoded.chavePublica) return next()
        return res.status(401).json({message:"Não autorizado"})
    } catch (error) {
        return res.status(401).json({message:"Não autorizado"})
    }
}
