
import { ApiError } from "../../../errors/ApiError"
import { ISistemaEleitoralWrapper } from "../../../services/interfaces/ISistemaEleitoralWrapper"
import { StatusDaEleicao } from "../../../types/StatusDaEleicao"
import { getCurrentTimeStamp } from "../../../utils/getCurrentTimeStamp"
import { VotarDTO } from "./VotarDTO"

export class VotarUseCase{
    constructor(private sistemaEleitoralWrapper: ISistemaEleitoralWrapper){}
    async execute(data: VotarDTO): Promise<string>{
        const { anoDaEleicao, chavePublica, numeroDoCandidato, prazo, signature } = data
        const timestamp = getCurrentTimeStamp()
        if(timestamp>prazo) throw new ApiError("Prazo expirado",400)
        const eleicaoStatus = await this.sistemaEleitoralWrapper.getEleicaoStatus(anoDaEleicao)
        if(eleicaoStatus===null) throw new ApiError("Could not get election status",500)
        if(eleicaoStatus=== StatusDaEleicao.ENCERRADA) throw new ApiError("Eleição já foi encerrada",400)
        if(eleicaoStatus=== StatusDaEleicao.NAO_INICIADA) throw new ApiError("Eleição ainda não foi iniciada",400)
        const permissaoDeVoto = await this.sistemaEleitoralWrapper.getPermissaoDeVoto(anoDaEleicao,chavePublica)
        if(permissaoDeVoto===null) throw new ApiError("Could not get vote permission",500)
        if(!permissaoDeVoto) throw new ApiError("Endereço não tem permissão para votar ou já votou",400)
        const transactionHash = await this.sistemaEleitoralWrapper.votar(anoDaEleicao,chavePublica,numeroDoCandidato,prazo,signature)
        
        if(!transactionHash) throw new ApiError("Could not vote",500)
        return transactionHash
    }
}