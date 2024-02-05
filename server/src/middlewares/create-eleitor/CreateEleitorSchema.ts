import {z} from "zod"
import { isAddress } from "ethers"

const CreateEleitorSchema = z.object({
    cpf: z.string().length(11).regex(/^[0-9]+$/),
    chavePublica: z.string().length(42).refine((chavePublica) => isAddress(chavePublica)),
})

export  {CreateEleitorSchema}