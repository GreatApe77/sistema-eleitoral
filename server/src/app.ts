import express from "express"
import morgan from "morgan"
const app = express()

const PORT = 8080


app.use(express.json())
app.use(morgan("tiny"))



export default app
