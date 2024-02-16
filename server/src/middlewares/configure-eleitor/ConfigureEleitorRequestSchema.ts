import { isAddress } from "ethers";
import { z } from "zod";


export const ConfigureEleitorRequestSchema = z.object({
    anoDaEleicao: z.string(),
    method: z.string().refine(method=>{
        return method === "anexar" || method === "remover"
    }),
    eleitores: z.array(z.string().refine(eleitor=>{
        return isAddress(eleitor)
    })).max(10)
});