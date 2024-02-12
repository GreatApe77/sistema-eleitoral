import { Candidato } from "../../models/Candidato";
import { deployNewEleicao as deployNewEleicaoService } from "../../web3-services/deployNewEleicao";
import { IEleicaoRepository } from "../IEleicaoRepository";

export class EleicaoRepository implements IEleicaoRepository{
    async deployNewEleicao(anoDaEleicao: string,candidatosIniciais:Candidato[]): Promise<string | null> {
        try {
            const eleicao = await deployNewEleicaoService(anoDaEleicao,candidatosIniciais)
            const address = await eleicao.getAddress()
            return address             
        } catch (error) {
            console.error(error)
            return null
        }
    }

}