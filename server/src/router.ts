import express from "express"
import {createEleitorController} from "./use-cases/create-eleitor/"
import { findEleitorController } from "./use-cases/find-eleitor"

const router = express.Router()


router.post('/eleitores', (req,res)=>{
    return createEleitorController.handle(req,res)
})
router.get("/eleitores/:cpf",(req,res)=>{
    return findEleitorController.handle(req,res)
})
export default router
