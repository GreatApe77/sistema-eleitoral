
import { ApiError } from "../../../errors/ApiError"
import { ISistemaEleitoralWrapper } from "../../../services/interfaces/ISistemaEleitoralWrapper"
import { IniciarEleicaoDTO } from "./IniciarEleicaoDTO"


export class IniciarEleicaoUseCase {


    constructor(
        private sistemaEleitoralWrapper: ISistemaEleitoralWrapper
    ) { }

    async execute(data: IniciarEleicaoDTO) {
        //Todo: verificar status da eleição
        const retrievedEleicaoAddress = await this.sistemaEleitoralWrapper.getEleicaoAddress(data.anoDaEleicao)
        if(!retrievedEleicaoAddress) throw new ApiError("Eleição não existe",400)
        const transactionHash = await this.sistemaEleitoralWrapper.iniciarEleicao(data.anoDaEleicao)
        if(!transactionHash) throw new ApiError("Falha ao iniciar eleição",500)
        return transactionHash
    }
}