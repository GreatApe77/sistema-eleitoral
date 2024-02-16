import { Domain } from "../types/Domain"
import { sistemaEleitoraInstance } from "./config"

export async function getDomain(){
    const domain = await sistemaEleitoraInstance.eip712Domain()
    return {
        name: domain.name,
        version: domain.version,
        chainId: domain.chainId,
        verifyingContract: domain.verifyingContract
    } as Domain
}