import  "dotenv/config"

import {z} from "zod"

const EnvironmentSchema = z.object({
    PORT: z.string().optional().default("8080"),
    MONGO_URI: z.string(),
})


export const environment = EnvironmentSchema.parse(process.env)