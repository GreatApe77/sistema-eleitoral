import express from "express"
import {createEleitorController} from "./use-cases/create-eleitor/"
import { findEleitorController } from "./use-cases/find-eleitor"
import { validateEleitorRequest } from "./middlewares/create-eleitor/validateEleitorRequest"
import { validateFindEleitorRequest } from "./middlewares/find-eleitor/validateFindEleitorRequest"
import { validateDeleteEleitorRequest } from "./middlewares/delete-eleitor/validateDeleteEleitor"
import { deleteEleitorController } from "./use-cases/delete-eleitor"
import { loginAsAdminController } from "./use-cases/login-as-admin"
const router = express.Router()


router.post('/eleitores',validateEleitorRequest, (req,res)=>{
    return createEleitorController.handle(req,res)
})
router.get("/eleitores/:cpfOrIdOrChavePublica",validateFindEleitorRequest,(req,res)=>{
    return findEleitorController.handle(req,res)
})
router.delete("/eleitores/:cpf",validateDeleteEleitorRequest,(req,res)=>{
    return deleteEleitorController.handle(req,res)
})
router.post("/admin/login",(req,res)=>{
    return loginAsAdminController.handle(req,res)
})
export default router
