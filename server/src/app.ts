import express from "express"
import morgan from "morgan"
import router from "./router"
const app = express()

const PORT = 8080


app.use(express.json())
app.use(morgan("tiny"))
app.use(router)


export {app,PORT} 
