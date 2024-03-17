import { ethers } from "ethers";
import { environment } from "../../config/environment";
import { IEleitor } from "../../models/interfaces/IEleitor";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { IEleitorAuthService } from "../interfaces/IEleitorAuthService";
import jwt from "jsonwebtoken";
export class EleitorAuthService implements IEleitorAuthService {
  constructor(private readonly eleitorRepository: IEleitorRepository) {}
  generateToken(signerPublicKey: string): string {
    const payload = {
      chavePublica: signerPublicKey,
    };
    return jwt.sign(payload, environment.JWT_SECRET, { expiresIn: "24h" });
  }
  register(eleitor: IEleitor): Promise<void> {
    return this.eleitorRepository.save(eleitor);
  }
  verifySignature(
    signerPublicKey: string,
    signature: string,
    timestampInMs: number
  ): boolean {
    try {
      const FIVE_MINUTES_MILISECONDS = 300000;
      const now = Date.now();
      if (now - timestampInMs > FIVE_MINUTES_MILISECONDS) return false;
      const message = `Login Sistema Eleitoral: ${timestampInMs}`;
      console.log({ message, signature });
      const verifiedSigner = ethers.verifyMessage(message, signature);
      console.log({ verifiedSigner });
      if (verifiedSigner.toLowerCase() === signerPublicKey.toLowerCase()) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
