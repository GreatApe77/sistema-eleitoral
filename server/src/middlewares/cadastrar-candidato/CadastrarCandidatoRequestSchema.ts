import { z } from "zod";

export const CadastrarCandidatoRequestSchema = z.object({
  anoDaEleicao: z.number().int().max(9999).min(1000),
  candidato: z.object({
    nome: z.string().min(1),
    partido: z.string().min(1),
    fotoDoCandidatoUrl: z.string().url(),
    numeroDeVotacao: z.number().min(1).max(99),
  }),
});

 