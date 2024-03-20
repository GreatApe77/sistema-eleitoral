import { ethers } from "ethers";
import { Domain } from "../../types/Domain";
import { sistemaEleitoraInstance } from "../../web3-services/config";
import { getDomain } from "../../web3-services/getDomain";
import { getNonce } from "../../web3-services/getNonce";
import { ISistemaEleitoralWrapper } from "../interfaces/ISistemaEleitoralWrapper";
import { votar } from "../../web3-services/votar";
import { anexarEleitores as anexarEleitoresService } from "../../web3-services/anexarEleitores";
import { removerEleitores as removerEleitoresService } from "../../web3-services/removerEleitores";
import { getEleicaoStatus } from "../../web3-services/getEleicaoStatus";
import { StatusDaEleicao } from "../../types/StatusDaEleicao";
import { iniciarEleicao as iniciarEleicaoService } from "../../web3-services/inciarEleicao";
import { encerrarEleicao as encerrarEleicaoService } from "../../web3-services/encerrarEleicao";
import { ICandidato } from "../../models/interfaces/ICandidato";
import { cadastrarCandidato } from "../../web3-services/cadastrarCandidatos";
import { candidatoPorNumero } from "../../web3-services/candidatoPorNumero";
export class SistemaEleitoralWrapper implements ISistemaEleitoralWrapper {
  async candidatoPorNumero(anoDaEleicao: number, numeroDeVotacao: number): Promise<ICandidato> {
    const candidato = await candidatoPorNumero(anoDaEleicao,numeroDeVotacao)
    return candidato
  }
  public async cadastrarCandidato(
    anoDeEleicao: number,
    candidato: ICandidato
  ): Promise<string> {
    const hash = await cadastrarCandidato(anoDeEleicao, candidato);
    return hash;
  }
  async getPermissaoDeVoto(
    anoDaEleicao: string,
    chavePublica: string
  ): Promise<boolean> {
    const permissaoDeVoto = await sistemaEleitoraInstance.getPermissaoDeVoto(
      anoDaEleicao,
      chavePublica
    );
    return permissaoDeVoto;
  }
  async getNonce(chavePublica: string): Promise<number> {
    const nonce = await getNonce(chavePublica);
    return nonce;
  }
  async getDomain(): Promise<Domain> {
    const domain = await getDomain();
    return domain;
  }
  async votar(
    anoDaEleicao: string,
    chavePublica: string,
    numeroDoCandidato: string,
    timestamp: number,
    signature: string
  ): Promise<string> {
    const sigComponents = ethers.Signature.from(signature);
    console.log(sigComponents);
    const { v, r, s } = sigComponents;

    const response = await votar(
      anoDaEleicao,
      numeroDoCandidato,
      chavePublica,
      timestamp,
      v,
      r,
      s
    );

    return response;
  }
  async anexarEleitores(
    anoDaEleicao: string,
    eleitores: string[]
  ): Promise<string> {
    const response = await anexarEleitoresService(anoDaEleicao, eleitores);
    return response;
  }
  async removerEleitores(
    anoDaEleicao: string,
    eleitores: string[]
  ): Promise<string> {
    const response = await removerEleitoresService(anoDaEleicao, eleitores);
    return response;
  }
  async getEleicaoStatus(anoDaEleicao: string): Promise<StatusDaEleicao> {
    const status = await getEleicaoStatus(anoDaEleicao);
    return status;
  }
  async iniciarEleicao(anoDaEleicao: string): Promise<string> {
    const transactionHash = await iniciarEleicaoService(anoDaEleicao);
    return transactionHash;
  }
  async encerrarEleicao(anoDaEleicao: string): Promise<string> {
    const transactionHash = await encerrarEleicaoService(anoDaEleicao);
    return transactionHash;
  }
  async getEleicaoAddress(anoDaEleicao: string): Promise<string | null> {
    const endereco = await sistemaEleitoraInstance.eleicao(anoDaEleicao);
    if (endereco === ethers.ZeroAddress) return null;

    return endereco;
  }
  async anexarEleicao(
    anoDaEleicao: string,
    enderecoDeContrato: string
  ): Promise<string> {
    try {
      const transactionResponse = await sistemaEleitoraInstance.anexarEleicao(
        anoDaEleicao,
        enderecoDeContrato
      );
      return transactionResponse.hash;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao anexar eleição");
    }
  }
}
