import express from "express";
import { createEleitorController } from "../use-cases/create-eleitor";
import { validateEleitorRequest } from "../middlewares/create-eleitor/validateEleitorRequest";
import { validateDeleteEleitorRequest } from "../middlewares/delete-eleitor/validateDeleteEleitor";
import { validateFindEleitorRequest } from "../middlewares/find-eleitor/validateFindEleitorRequest";
import { onlyAdmin } from "../middlewares/only-admin/validateAdmin";
import { deleteEleitorController } from "../use-cases/delete-eleitor";
import { findEleitorController } from "../use-cases/find-eleitor";
import { loginAsEleitorController } from "../use-cases/login-as-eleitor";

const eleitoresRouter  =express.Router()

//ELEITORES
eleitoresRouter.post('/',validateEleitorRequest, (req,res)=>{
    return createEleitorController.handle(req,res)
})
eleitoresRouter.post("/login",(req,res)=>{
    return loginAsEleitorController.handle(req,res)
})
eleitoresRouter.get("/:cpfOrIdOrChavePublica",validateFindEleitorRequest,(req,res)=>{
    return findEleitorController.handle(req,res)
})
eleitoresRouter.delete("/:cpf",onlyAdmin,validateDeleteEleitorRequest,(req,res)=>{
    return deleteEleitorController.handle(req,res)
})

export {
    eleitoresRouter
}