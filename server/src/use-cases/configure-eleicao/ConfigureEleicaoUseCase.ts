import { Candidato } from "../../models/Candidato"
import { IEleicaoRepository } from "../../repositories/IEleicaoRepository"
import { ISistemaEleitoralRepository } from "../../repositories/ISistemaEleitoralRepository"
import { IConfigureEleicaoDTO } from "./IConfigureEleicaoDTO"

export class ConfigureEleicaoUseCase {
    constructor(
        private eleicaoRepository: IEleicaoRepository,
        private sistemaEleitoralRepository: ISistemaEleitoralRepository
    ){}

    async execute(data:IConfigureEleicaoDTO){
        const candidatosIniciaisPreparados = data.candidatosIniciais.map(candidato => new Candidato(candidato.nome,candidato.partido,candidato.fotoDoCandidatoUrl,candidato.numeroDeVotacao))
        const eleicaoAddress = await this.eleicaoRepository.deployNewEleicao(data.anoDaEleicao,candidatosIniciaisPreparados)
        console.log({eleicaoAddress})
        if(!eleicaoAddress) throw new Error("Failed to deploy new eleicao")
        const transactionHash = await this.sistemaEleitoralRepository.anexarEleicao(data.anoDaEleicao,eleicaoAddress)
        console.log({transactionHash})
        if(!transactionHash) throw new Error("Falha ao anexar eleição ao sistema eleitoral")
        return {transactionHash,eleicaoAddress}
    }
}