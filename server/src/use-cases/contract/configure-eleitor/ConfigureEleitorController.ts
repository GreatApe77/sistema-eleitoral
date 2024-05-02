import { Request, Response } from "express";
import { ConfigureEleitorUseCase } from "./ConfigureEleitorUseCase";
import { handleErrors } from "../../../errors/handleErrors";

export class ConfigureEleitorController {
    constructor(
        private readonly configureEleitorUseCase: ConfigureEleitorUseCase
    ) { }

    async handle(request: Request, response: Response): Promise<Response> {
        const { anoDaEleicao, method, eleitores } = request.body

        try {
           const transactionHash =  await this.configureEleitorUseCase.execute({ anoDaEleicao, method, eleitores })
            return response.status(200).json({transactionHash})
        } catch (error) {
            return handleErrors(error,response)
        }
    }
}