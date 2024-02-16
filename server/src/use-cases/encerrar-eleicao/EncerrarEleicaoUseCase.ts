import { ApiError } from "../../errors/ApiError"
import { SistemaEleitoralRepository } from "../../repositories/implementations/SistemaEleitoralRepository"
import { EncerrarEleicaoDTO } from "./EncerrarEleicaoDTO"

export class EncerrarEleicaoUseCase {
    constructor(private sistemaEleitoralRepository: SistemaEleitoralRepository) {}

    async execute(data: EncerrarEleicaoDTO) {
        const eleicaoAddress = await this.sistemaEleitoralRepository.getEleicaoAddress(data.anoDaEleicao)
        if (!eleicaoAddress) throw new ApiError("Eleição não existe", 400)
        const response = await this.sistemaEleitoralRepository.encerrarEleicao(data.anoDaEleicao)
        if (!response) throw new ApiError("Falha ao encerrar eleição", 500)
        return response
    }
}