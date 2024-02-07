import {z} from "zod"

const DeleteEleitorRequestSchema = z.object({
    cpf: z.string().length(11).regex(/^[0-9]+$/),

})

export  {DeleteEleitorRequestSchema}