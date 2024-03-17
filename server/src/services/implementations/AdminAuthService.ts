import { environment } from "../../config/environment";
import { IAdminAuthService } from "../interfaces/IAdminAuthService";
import { id as keccak256 } from "ethers";
import jwt from "jsonwebtoken";
export class AdminAuthService implements IAdminAuthService {
  validatePassword(ultraSecretPassword: string): boolean {
    const hashedPassword = keccak256(ultraSecretPassword);
    return hashedPassword === environment.ADMIN_SECRET_PASSWORD_HASH;
  }
  generateToken(): string {
    const token = jwt.sign({ admin: true }, environment.JWT_SECRET, {
      expiresIn: "24h",
    });
    return token;
  }
  //login(ultraSecretPassword: string): Promise<string | null> {
  ////    throw new Error("Method not implemented.");
  //}
}
