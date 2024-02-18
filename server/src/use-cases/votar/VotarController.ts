import { Request, Response } from "express";
import { VotarUseCase } from "./VotarUseCase";
import { VotarDTO } from "./VotarDTO";
import { ApiError } from "../../errors/ApiError";
import { handleErrors } from "../../errors/handleErrors";

export class VotarController {
  constructor(private votarUseCase: VotarUseCase) {}

  async handle(req: Request, res: Response) {
    const data = req.body as VotarDTO;
    try {
      const transactionHash = await this.votarUseCase.execute(data);
      res.status(200).json({ transactionHash });
    } catch (error) {
      return handleErrors(error, res);
    }
  }
}
