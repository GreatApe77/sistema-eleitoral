import express from "express"
import {createEleitorController} from "./use-cases/create-eleitor/"
import { findEleitorController } from "./use-cases/find-eleitor"
import { validateEleitorRequest } from "./middlewares/create-eleitor/validateEleitorRequest"
import { validateFindEleitorRequest } from "./middlewares/find-eleitor/validateFindEleitorRequest"
import { validateDeleteEleitorRequest } from "./middlewares/delete-eleitor/validateDeleteEleitor"
import { deleteEleitorController } from "./use-cases/delete-eleitor"
import { loginAsAdminController } from "./use-cases/login-as-admin"
import { validateAdminLoginRequest } from "./middlewares/admin-login/validateAdminLoginRequest"
import { onlyAdmin } from "./middlewares/only-admin/validateAdmin"
import { loginAsEleitorController } from "./use-cases/login-as-eleitor"
import { configureEleicaoController } from "./use-cases/configure-eleicao"
import { validateConfigureEleicaoSchema } from "./middlewares/configure-eleicao/validateConfigureEleicaoSchema"
import { iniciarEleicaoController } from "./use-cases/iniciar-eleicao"
import { encerrarEleicaoController } from "./use-cases/encerrar-eleicao"
import { validateIniciarEleicao } from "./middlewares/iniciar-eleicao/validateIniciarEleicao"
import { validateEncerrarEleicao } from "./middlewares/encerrear-eleicao/validateEncerrarEleicao"
const router = express.Router()


router.post('/eleitores',validateEleitorRequest, (req,res)=>{
    return createEleitorController.handle(req,res)
})
router.post("/eleitores/login",(req,res)=>{
    return loginAsEleitorController.handle(req,res)
})
router.get("/eleitores/:cpfOrIdOrChavePublica",validateFindEleitorRequest,(req,res)=>{
    return findEleitorController.handle(req,res)
})
router.delete("/eleitores/:cpf",onlyAdmin,validateDeleteEleitorRequest,(req,res)=>{
    return deleteEleitorController.handle(req,res)
})
router.post("/admin/login",validateAdminLoginRequest,(req,res)=>{
    return loginAsAdminController.handle(req,res)
})

router.post("/admin/eleicao",onlyAdmin,validateConfigureEleicaoSchema,(req,res)=>{
    return configureEleicaoController.handle(req,res)
})
router.post("/admin/eleicao/iniciar",onlyAdmin,validateIniciarEleicao,(req,res)=>{
    return iniciarEleicaoController.handle(req,res)
})
router.post("/admin/eleicao/encerrar",onlyAdmin,validateEncerrarEleicao,(req,res)=>{
    return encerrarEleicaoController.handle(req,res)
})


router.post("/admin/eleicao/candidatos",(req,res)=>{})

export default router
