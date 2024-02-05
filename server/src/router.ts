import express from "express"
import {createEleitorController} from "./use-cases/create-eleitor/"

const router = express.Router()


router.post('/eleitores', (req,res)=>{
    return createEleitorController.handle(req,res)
})

export default router
