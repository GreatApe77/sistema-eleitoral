import { ApiError } from "../../errors/ApiError"
import { ISistemaEleitoralRepository } from "../../repositories/ISistemaEleitoralRepository"
import { IniciarEleicaoDTO } from "./IniciarEleicaoDTO"


export class IniciarEleicaoUseCase {


    constructor(
        private sistemaEleitoralRepository: ISistemaEleitoralRepository
    ) { }

    async execute(data: IniciarEleicaoDTO) {
        //Todo: verificar status da eleição
        const retrievedEleicaoAddress = await this.sistemaEleitoralRepository.getEleicaoAddress(data.anoDaEleicao)
        if(!retrievedEleicaoAddress) throw new ApiError("Eleição não existe",400)
        const transactionHash = await this.sistemaEleitoralRepository.iniciarEleicao(data.anoDaEleicao)
        if(!transactionHash) throw new ApiError("Falha ao iniciar eleição",500)
        return transactionHash
    }
}