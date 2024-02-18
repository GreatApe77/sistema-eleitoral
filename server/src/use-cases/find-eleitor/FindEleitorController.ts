import { handleErrors } from "../../errors/handleErrors";
import { FindEleitorUseCase } from "./FindEleitorUseCase";
import { Request, Response } from "express";
export default class FindEleitorController {
  constructor(private findEleitorUseCase: FindEleitorUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const filter = req.params.filter;
    const value = req.params.value;

    try {
      const eleitor = await this.findEleitorUseCase.execute({ filter, value });

      return res.status(200).json(eleitor);
    } catch (error) {
      return handleErrors(error, res);
    }
  }
}
