import {z} from "zod"

const FindEleitorRequestSchema = z.object({
    cpf: z.string().length(11).regex(/^[0-9]+$/).optional(),
    chavePublica: z.string().length(42).optional(),
    id: z.string().optional()
})

export {FindEleitorRequestSchema}