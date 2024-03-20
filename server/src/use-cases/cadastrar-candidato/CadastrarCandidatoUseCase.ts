import { ApiError } from "../../errors/ApiError";
import { Candidato } from "../../models/Candidato";
import { ISistemaEleitoralWrapper } from "../../services/interfaces/ISistemaEleitoralWrapper";
import { StatusDaEleicao } from "../../types/StatusDaEleicao";
import { CadastrarCandidatoDTO } from "./CadastrarCandidatoDTO";

export class CadastrarCandidatoUseCase {
  constructor(
    private readonly sistemaEleitoralWrapper: ISistemaEleitoralWrapper
  ) {}
  async execute(data: CadastrarCandidatoDTO) {
    const candidato = new Candidato(
      data.candidato.nome,
      data.candidato.partido,
      data.candidato.fotoDoCandidatoUrl,
      data.candidato.numeroDeVotacao
    );

    try {
      const [retrievedCandidato,status] = await Promise.all([
        this.sistemaEleitoralWrapper.candidatoPorNumero(
          data.anoDaEleicao,
          data.candidato.numeroDeVotacao
        ),
        this.sistemaEleitoralWrapper.getEleicaoStatus(
          data.anoDaEleicao.toString()
        ),
      ]);
      if(status!==StatusDaEleicao.NAO_INICIADA) throw new ApiError("Eleicao ja esta ativa",400)
      if (retrievedCandidato.numeroDeVotacao !== 0)
        throw new ApiError("Candidato ja cadastrado",400);
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(`Erro ao buscar candidato `);
    }
    try {
      const hash = await this.sistemaEleitoralWrapper.cadastrarCandidato(
        data.anoDaEleicao,
        candidato
      );
      return hash;
    } catch (error) {
      throw new ApiError(
        `Erro ao cadastrar o candidato de numero ${data.candidato.numeroDeVotacao} na eleicao ${data.anoDaEleicao}`
      );
    }
  }
}
