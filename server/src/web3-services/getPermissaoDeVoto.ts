import { sistemaEleitoraInstance } from "./config";

export async function getPermissaoDeVoto(anoDaEleicao: string, eleitor: string) {
    const permissaoDeVoto = await sistemaEleitoraInstance.getPermissaoDeVoto(anoDaEleicao, eleitor)
    return permissaoDeVoto
}