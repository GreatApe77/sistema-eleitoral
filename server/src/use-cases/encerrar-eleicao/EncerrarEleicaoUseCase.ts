import { ApiError } from "../../errors/ApiError"
import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository"
import { StatusDaEleicao } from "../../types/StatusDaEleicao"
import { EncerrarEleicaoDTO } from "./EncerrarEleicaoDTO"

export class EncerrarEleicaoUseCase {
    constructor(private sistemaEleitoralRepository: SistemaEleitoralRepository) {}

    async execute(data: EncerrarEleicaoDTO) {
        //Todo: verificar status da eleicao
        const eleicaoAddress = await this.sistemaEleitoralRepository.getEleicaoAddress(data.anoDaEleicao)
        if(!eleicaoAddress) throw new ApiError("Eleição não encontrada",404)
        const statusDaEleicao = await this.sistemaEleitoralRepository.getEleicaoStatus(data.anoDaEleicao)
        if(statusDaEleicao==null) throw new ApiError("Erro ao tentar buscar status da eleição",500)
        if(statusDaEleicao!== StatusDaEleicao.ATIVA) throw new ApiError("Eleição não pode ser encerrada porque já está encerrada ou não começou ainda",400)
        const response = await this.sistemaEleitoralRepository.encerrarEleicao(data.anoDaEleicao)
        if (!response) throw new ApiError("Falha ao encerrar eleição", 500)
        return response
    }
}