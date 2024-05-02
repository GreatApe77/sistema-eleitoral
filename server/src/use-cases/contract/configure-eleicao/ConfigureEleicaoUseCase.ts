
import { ApiError } from "../../../errors/ApiError";
import { Candidato } from "../../../models/Candidato";
import { IEleicaoRepository } from "../../../repositories/IEleicaoRepository";
import { ISistemaEleitoralWrapper } from "../../../services/interfaces/ISistemaEleitoralWrapper";
import { IConfigureEleicaoDTO } from "./IConfigureEleicaoDTO";

export class ConfigureEleicaoUseCase {
  constructor(
    private eleicaoRepository: IEleicaoRepository,
    private sistemaEleitoralWrapper: ISistemaEleitoralWrapper
  ) {}

  async execute(data: IConfigureEleicaoDTO) {
    const retrievedEleicaoAddress =
      await this.sistemaEleitoralWrapper.getEleicaoAddress(
        data.anoDaEleicao
      );
    if (retrievedEleicaoAddress) throw new ApiError("Eleição já existe", 400);

    const candidatosIniciaisPreparados = data.candidatosIniciais.map(
      (candidato) =>
        new Candidato(
          candidato.nome,
          candidato.partido,
          candidato.fotoDoCandidatoUrl,
          candidato.numeroDeVotacao
        )
    );
    const eleicaoAddress = await this.eleicaoRepository.deployNewEleicao(
      data.anoDaEleicao,
      candidatosIniciaisPreparados
    );
    //console.log({ eleicaoAddress });
    //if (!eleicaoAddress) throw new ApiError("Falha ao criar eleição", 500);
    const transactionHash = await this.sistemaEleitoralWrapper.anexarEleicao(
      data.anoDaEleicao,
      eleicaoAddress
    );
    //console.log({ transactionHash });
    
      
    return { transactionHash, eleicaoAddress };
  }
}
