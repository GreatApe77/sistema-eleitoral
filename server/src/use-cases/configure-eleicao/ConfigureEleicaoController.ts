import { Candidato } from "../../models/Candidato"
import { ConfigureEleicaoUseCase } from "./ConfigureEleicaoUseCase"
import { Request, Response } from "express"
export class ConfigureEleicaoController{

    constructor(
        private configureEleciaoUseCase: ConfigureEleicaoUseCase
    ){}

    async handle(req:Request,res:Response){
        const anoDaEleicao = req.body.anoDaEleicao as string
        const candidatosIniciais = req.body.candidatosIniciais as Candidato[]
        try {
            const result = await this.configureEleciaoUseCase.execute({anoDaEleicao,candidatosIniciais})
            return res.status(201).json(result)
        } catch (error) {
            return res.status(500).send()
        }
    }
}