
import { handleErrors } from "../../../errors/handleErrors"
import { IniciarEleicaoUseCase } from "./IniciarEleicaoUseCase"
import { Request, Response } from "express"
export class IniciarEleicaoController {
    constructor(private iniciarEleicaoUseCase: IniciarEleicaoUseCase) { }
    async handle(request: Request, response: Response): Promise<Response> {
        const { anoDaEleicao } = request.body
        try {
            await this.iniciarEleicaoUseCase.execute({ anoDaEleicao })
            return response.status(200).send()
        } catch (error) {
            return handleErrors(error, response)
        }
    }
}