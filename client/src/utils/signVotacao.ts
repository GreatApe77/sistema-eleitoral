import { ethers } from "ethers";
import { VotacaoType } from "../types/VotacaoType";
import { sistemaEleitoralInstance } from "../web3-services/smart-contract-connection";
import { DadosDeVotacao } from "../types/DadosDeVotacao";
export async function signVotacao(dadosDeVotacao: DadosDeVotacao,privateKey: string) {
    
    const wallet = new ethers.Wallet(privateKey)
    if(wallet.address.toLowerCase() !== dadosDeVotacao.chavePublica.toLowerCase()){
        throw new Error("A chave privada não corresponde a chave pública")
    }
    const retrievedDomain = await sistemaEleitoralInstance.eip712Domain()
    
    const values = {
        assinante: dadosDeVotacao.chavePublica,
        numeroDoCandidato: dadosDeVotacao.numeroDoCandidato,
        anoDaEleicao: dadosDeVotacao.anoDaEleicao,
        nonce: await sistemaEleitoralInstance.nonces(dadosDeVotacao.chavePublica),
        prazo: dadosDeVotacao.prazo ,
    };
    const formatedDomain = {
        name: retrievedDomain.name,
        version: retrievedDomain.version,
        chainId: retrievedDomain.chainId,
        verifyingContract: retrievedDomain.verifyingContract,
    };
    
    const signature = await wallet.signTypedData(formatedDomain,VotacaoType,values)

    return {
        ...dadosDeVotacao,
        signature
    }
    
}
