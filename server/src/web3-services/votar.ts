import { BigNumberish, BytesLike } from "ethers";
import { sistemaEleitoraInstance } from "./config";

export async function votar(anoDaEleicao: string,numeroDoCandidato:string,eleitor:string,prazo:number,v:BigNumberish,r:BytesLike,s:BytesLike): Promise<string> {
    const response = await sistemaEleitoraInstance.votar(anoDaEleicao,numeroDoCandidato,eleitor,prazo,v,r,s)
    return response.hash;
}