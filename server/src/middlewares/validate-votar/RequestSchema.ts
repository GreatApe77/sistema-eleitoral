import {z} from "zod";
import { VotarDTO } from "../../use-cases/votar/VotarDTO";
import { isAddress } from "ethers";
//0xa775955d6e3c8d5fd170db89635c2178f819643a8225b9fa479a510c59a3e6023ae19a6a959f218898bb61e9c82da75775c62f8f9dc96e54a0590ef73b9722c51c
export const RequestSchema = z.object({
        
        anoDaEleicao: z.string().length(4).regex(/^[0-9]+$/),
        chavePublica: z.string().refine((chavePublica) =>{
            return isAddress(chavePublica)
        }),
        signature: z.string().length(132).startsWith("0x"),
        numeroDoCandidato: z.string().length(2).regex(/^[0-9]+$/).or(z.string().refine((numero)=>numero==="777")), // 777 é o voto nulo
        prazo: z.number().int().positive()
} );