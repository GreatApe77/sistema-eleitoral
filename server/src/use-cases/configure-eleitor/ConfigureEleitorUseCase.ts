import { ApiError } from "../../errors/ApiError";
import { IEleitorRepository } from "../../repositories/IEleitorRepository";
import { ISistemaEleitoralRepository } from "../../repositories/ISistemaEleitoralRepository";
import { StatusDaEleicao } from "../../types/StatusDaEleicao";
import { IConfigureEleitorDTO } from "./ConfigureEleitorDTO";

export class ConfigureEleitorUseCase {


    constructor(private sistemaEleitoralRepository: ISistemaEleitoralRepository,private eleitorRepository: IEleitorRepository) {
        
    }

    async execute(data :IConfigureEleitorDTO){
        const eleitores = await Promise.all(data.eleitores.map(eleitor=>this.eleitorRepository.findByChavePublica(eleitor)))
        if(eleitores.includes(null)){
            throw new ApiError("Eleitor não encontrado",404)
        }
        const statusDaEleicao = await this.sistemaEleitoralRepository.getEleicaoStatus(data.anoDaEleicao)
        if(statusDaEleicao===null) throw new ApiError("Eleição não encontrada",404)
        if(statusDaEleicao!==StatusDaEleicao.NAO_INICIADA) throw new ApiError("Eleição já iniciada",400)
        switch (data.method) {
            case "anexar":
                const transactionHashAnexar = await this.sistemaEleitoralRepository.anexarEleitores(data.anoDaEleicao,data.eleitores)
                if(transactionHashAnexar===null) throw new ApiError("Erro ao anexar eleitores",500)
                return transactionHashAnexar
                
            case "remover":
                const transactionHashRemover = await this.sistemaEleitoralRepository.removerEleitores(data.anoDaEleicao,data.eleitores)
                if(transactionHashRemover===null) throw new ApiError("Erro ao remover eleitores",500)
                return transactionHashRemover
                    
            default:
                throw new ApiError("Método inválido",400)
                
        }
    }
}