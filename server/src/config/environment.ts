import  "dotenv/config"

import {z} from "zod"

const EnvironmentSchema = z.object({
    PORT: z.string().optional().default("8080"),
    MONGO_URI: z.string(),
    ADMIN_SECRET_PASSWORD_HASH: z.string().length(66),
    JWT_SECRET: z.string(),
    ETH_NODE_URL: z.string(),
    ADMIN_WALLET_PRIVATE_KEY: z.string().length(64),
    SISTEMA_ELEITORAL_CONTRACT_ADDRESS: z.string().length(42)
})


export const environment = EnvironmentSchema.parse(process.env)