import { z } from "zod";
/* {
    "anoDaEleicao": "2002",
    "candidatosIniciais": [
      {
        "nome": "Candidate A",
        "partido": "Party X",
        "fotoDoCandidatoUrl": "http://example.com/candidateA.jpg",
        "numeroDeVotacao": 123
      },
      {
        "nome": "Candidate B",
        "partido": "Party Y",
        "fotoDoCandidatoUrl": "http://example.com/candidateB.jpg",
        "numeroDeVotacao": 456
      }
    ]
  }
   */

export const RequestConfigureEleicaoSchema = z.object({
  anoDaEleicao: z.string(),
  candidatosIniciais: z.array(
    z.object({
      nome: z.string().min(2),
      partido: z.string().min(2),
      fotoDoCandidatoUrl: z.string().url(),
      numeroDeVotacao: z.number().min(1).max(100),
    })
  ).min(1).max(8),
});
