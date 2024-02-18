import { ApiError } from "../../errors/ApiError"
import { ISistemaEleitoralRepository } from "../../repositories/ISistemaEleitoralRepository"
import { getCurrentTimeStamp } from "../../utils/getCurrentTimeStamp"
import { VotarDTO } from "./VotarDTO"

export class VotarUseCase{
    constructor(private sistemaEleitoralRepository: ISistemaEleitoralRepository){}
    async execute(data: VotarDTO): Promise<string>{
        const { anoDaEleicao, chavePublica, numeroDoCandidato, prazo, signature } = data
        const nonce = await this.sistemaEleitoralRepository.getNonce(chavePublica)
        if(nonce===null) throw new ApiError("Could not get nonce",500)
        const timestamp = getCurrentTimeStamp()
        if(timestamp>prazo) throw new ApiError("Prazo expirado",400)
        
        const transactionHash = await this.sistemaEleitoralRepository.votar(anoDaEleicao,numeroDoCandidato,chavePublica,timestamp,signature)
        
        if(!transactionHash) throw new ApiError("Could not vote",500)
        return transactionHash
    }
}