import { NextFunction, Request, Response } from "express";
import { handleErrors } from "../../errors/handleErrors";
import { CadastrarCandidatoRequestSchema } from "./CadastrarCandidatoRequestSchema";
import { ZodError } from "zod";

export function validateCadastrarCandidatoRequest(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    CadastrarCandidatoRequestSchema.parse(req.body)
    next()
  } catch (error) {
    return res.sendStatus(422)
}
}
