import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken"
import { environment } from "../../config/environment";

export async function onlyAdmin(req: Request, res: Response, next: NextFunction) {
    let token = req.headers.authorization
    if (!token) return res.status(422).json("Token is required")
    token = token.split(" ")[1]
    if (typeof token !== "string") return res.status(422).json("Token must be a string")
    try {
        const decoded = jwt.verify(token,environment.JWT_SECRET)
        if(typeof decoded === "object" && decoded.admin) return next()
        return res.status(401).json("Unauthorized")
    } catch (error) {
        return res.status(401).json("Unauthorized")
    }
}


