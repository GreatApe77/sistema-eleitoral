import { ethers } from "ethers";
import { adminWallet, sistemaEleitoraInstance } from "../../web3-services/config";
import { ISistemaEleitoralRepository } from "../ISistemaEleitoralRepository";
import { iniciarEleicao as iniciarEleicaoService } from "../../web3-services/inciarEleicao";
import { encerrarEleicao as encerrarEleicaoService } from "../../web3-services/encerrarEleicao";
import { StatusDaEleicao } from "../../types/StatusDaEleicao";
import { getEleicaoStatus } from "../../web3-services/getEleicaoStatus";
import { anexarEleitores as anexarEleitoresService } from "../../web3-services/anexarEleitores";
import { removerEleitores as removerEleitoresService } from "../../web3-services/removerEleitores";
import { getDomain } from "../../web3-services/getDomain";
import { Domain } from "../../types/Domain";
import { votar } from "../../web3-services/votar";

export class SistemaEleitoralRepository implements ISistemaEleitoralRepository{
    async getDomain(): Promise<Domain | null> {
            try {
                    const domain = await getDomain()
                    return domain
            } catch (error) {
                console.error(error)
                return null
            }
    }
    async votar(anoDaEleicao: string,chavePublica:string, numeroDoCandidato: string, timestamp: number, signature: string): Promise<string | null> {
            const domain = await this.getDomain()
            if(domain===null) return null
            const sigComponents = ethers.Signature.from(signature)
            const { v, r, s } = sigComponents
            try {
                const response = await votar(anoDaEleicao,numeroDoCandidato,chavePublica,timestamp ,v,r,s)
                
                return response
            } catch (error) {
                console.error(error)
                return null
            }
    }
    async anexarEleitores(anoDaEleicao: string, eleitores: string[]): Promise<string | null> {
        try {
            const response = await anexarEleitoresService(anoDaEleicao, eleitores)
            return response
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async removerEleitores(anoDaEleicao: string, eleitores: string[]): Promise<string | null> {
        
        try {
            const response = await removerEleitoresService(anoDaEleicao, eleitores)
            return response
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async getEleicaoStatus(anoDaEleicao: string): Promise<StatusDaEleicao | null> {
        try {
            const status = await getEleicaoStatus(anoDaEleicao)
            return status  
        } catch (error) {
            return null
        }
    }
    async iniciarEleicao(anoDaEleicao: string): Promise<string | null> {
        try {
            const transactionHash = await iniciarEleicaoService(anoDaEleicao)
            return transactionHash
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async encerrarEleicao(anoDaEleicao: string): Promise<string | null> {
        try {
            const transactionHash = await encerrarEleicaoService(anoDaEleicao)
            return transactionHash
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async getEleicaoAddress(anoDaEleicao: string): Promise<string | null> {
        try {
            const endereco = await sistemaEleitoraInstance.eleicao(anoDaEleicao)
            if(endereco===ethers.ZeroAddress) return null

                return endereco
            
        } catch (error) {
            console.error(error)
            return null
        }
    }
    async anexarEleicao(anoDaEleicao: string, enderecoDeContrato: string): Promise<string> {
        try {
            const transactionResponse = await sistemaEleitoraInstance.anexarEleicao(anoDaEleicao,enderecoDeContrato)
            return transactionResponse.hash
        } catch (error) {
            console.error(error)
            throw new Error("Erro ao anexar eleição")
        }
    }
    

}