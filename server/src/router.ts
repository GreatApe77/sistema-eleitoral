import express from "express"

import { loginAsAdminController } from "./use-cases/login-as-admin"
import { validateAdminLoginRequest } from "./middlewares/admin-login/validateAdminLoginRequest"
import { onlyAdmin } from "./middlewares/only-admin/validateAdmin"

import { validateConfigureEleicaoSchema } from "./middlewares/configure-eleicao/validateConfigureEleicaoSchema"
import { validateIniciarEleicao } from "./middlewares/iniciar-eleicao/validateIniciarEleicao"
import { validateEncerrarEleicao } from "./middlewares/encerrear-eleicao/validateEncerrarEleicao"
import { configureEleitorController } from "./use-cases/contract/configure-eleitor"
import { validateConfigureEleitor } from "./middlewares/configure-eleitor/validateConfigureEleitor"
import { votarController } from "./use-cases/contract/votar"
import { onlyLoggedEleitor } from "./middlewares/only-logged-eleitor/onlyLoggedEleitor"
import { validateVotar } from "./middlewares/validate-votar/validateVotar"
import { cadastrarCandidatoController } from "./use-cases/contract/cadastrar-candidato"
import { validateCadastrarCandidatoRequest } from "./middlewares/cadastrar-candidato/validateCadastrarCandidatoRequest"
import { eleitoresRouter } from "./routes/eleitores"
import { configureEleicaoController } from "./use-cases/contract/configure-eleicao"
import { encerrarEleicaoController } from "./use-cases/contract/encerrar-eleicao"
import { iniciarEleicaoController } from "./use-cases/contract/iniciar-eleicao"
const router = express.Router()

//ELEITORES
router.use("/eleitores",eleitoresRouter)

//ELEICAO
router.post("/admin/login",validateAdminLoginRequest,(req,res)=>{
    return loginAsAdminController.handle(req,res)
})
router.post("/admin/eleicao/votar",onlyLoggedEleitor,validateVotar,(req,res)=>{
    return votarController.handle(req,res)
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
router.post("/admin/eleicao/candidatos",onlyAdmin,validateCadastrarCandidatoRequest,(req,res)=>{
    return cadastrarCandidatoController.handle(req,res)
})
router.post("/admin/eleicao/eleitores",onlyAdmin,validateConfigureEleitor,(req,res)=>{
    return configureEleitorController.handle(req,res)
})



export default router
