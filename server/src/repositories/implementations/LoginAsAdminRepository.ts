import { environment } from "../../config/environment";
import { ILoginAsAdminRepository } from "../ILoginAsAdminRepository";
import { id as keccak256 } from "ethers";
import jwt from "jsonwebtoken"
export class LoginAsAdminRepository implements ILoginAsAdminRepository{
    async login(ultraSecretPassword: string): Promise<string| null> {
        const hashedPassword = keccak256(ultraSecretPassword)
        const passwordMatch = hashedPassword === environment.ADMIN_SECRET_PASSWORD_HASH
        if(!passwordMatch) return null
        try {
            const token = jwt.sign({admin:true},environment.JWT_SECRET,{expiresIn:"24h"})
            return token
        } catch (error) {
            console.error(error)
            return null
        }

    }
    
}   