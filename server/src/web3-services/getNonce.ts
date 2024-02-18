import { sistemaEleitoraInstance } from "./config";

export async function getNonce(chavePublica: string): Promise<number> {
    const nonce = await sistemaEleitoraInstance.nonces(chavePublica)
    return Number(nonce)
}