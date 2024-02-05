import express from "express"
import {createEleitorController} from "./use-cases/create-eleitor/"
import { findEleitorController } from "./use-cases/find-eleitor"
import { validateEleitorRequest } from "./middlewares/create-eleitor/validateEleitorRequest"
import { validateFindEleitorRequest } from "./middlewares/find-eleitor/validateFindEleitorRequest"
const router = express.Router()


router.post('/eleitores',validateEleitorRequest, (req,res)=>{
    return createEleitorController.handle(req,res)
})
router.get("/eleitores/:cpfOrIdOrChavePublica",validateFindEleitorRequest,(req,res)=>{
    return findEleitorController.handle(req,res)
})
export default router
