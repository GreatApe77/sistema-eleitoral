import { sistemaEleitoraInstance } from "./config";

export async function anexarEleitores(anoDaEleicao: string, eleitores: string[]): Promise<string> {
const response = await sistemaEleitoraInstance.aprovarEleitores(anoDaEleicao, eleitores)
return response.hash
}