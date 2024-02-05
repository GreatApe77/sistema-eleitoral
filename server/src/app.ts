import express from "express"
import morgan from "morgan"
import router from "./router"
import { environment } from "./config/environment"
const app = express()

const PORT = environment.PORT


app.use(express.json())
app.use(morgan("tiny"))
app.use(router)



export {app,PORT} 
