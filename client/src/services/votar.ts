import { SERVER_URL } from "../constants/SERVER_URL";
import { ApiCall } from "../types/ApiCall";
import { DadosDeVotacao } from "../types/DadosDeVotacao";

export async function votar(dados: DadosDeVotacao,token:string) {
  try {
    const response = await fetch(`${SERVER_URL}/admin/eleicao/votar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authorization":`Bearer ${token}`
      },
      body: JSON.stringify(dados),
    });
    const data = await response.json();
    return {
      statusCode: response.status,
      data,
    } as ApiCall;
  } catch (error) {
    console.error(error);
    throw new Error("Erro ao votar");
  }
}
