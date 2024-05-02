
import { ApiError } from "../../../errors/ApiError"
import { SistemaEleitoralWrapper } from "../../../services/implementations/SistemaEleitoralWrapper"
import { StatusDaEleicao } from "../../../types/StatusDaEleicao"
import { EncerrarEleicaoDTO } from "./EncerrarEleicaoDTO"

export class EncerrarEleicaoUseCase {
    constructor(private sistemaEleitoralWrapper: SistemaEleitoralWrapper) {}

    async execute(data: EncerrarEleicaoDTO) {
        //Todo: verificar status da eleicao
        const eleicaoAddress = await this.sistemaEleitoralWrapper.getEleicaoAddress(data.anoDaEleicao)
        if(!eleicaoAddress) throw new ApiError("Eleição não encontrada",404)
        const statusDaEleicao = await this.sistemaEleitoralWrapper.getEleicaoStatus(data.anoDaEleicao)
        if(statusDaEleicao==null) throw new ApiError("Erro ao tentar buscar status da eleição",500)
        if(statusDaEleicao!== StatusDaEleicao.ATIVA) throw new ApiError("Eleição não pode ser encerrada porque já está encerrada ou não começou ainda",400)
        const response = await this.sistemaEleitoralWrapper.encerrarEleicao(data.anoDaEleicao)
        if (!response) throw new ApiError("Falha ao encerrar eleição", 500)
        return response
    }
}