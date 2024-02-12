import { Container } from "@mui/material";
import CandidatoCard, { Candidato } from "../components/CandidatoCard";
const candidato:Candidato = {
  nome: "Carlos Santos",
  partido: "Partido B",
  fotoDoCandidatoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjA7danCZ0VWhzi4j7vjzm4rjBY9eN9mrCog-AHF9cKS2_4Mj8NCLPcZy_fyb1RE6Q2J0&usqp=CAU",
  quantidadeDeVotos: 0,
  numeroDeVotacao: 99,
  indice:0

}
export default function Resultados() {
  return (
    <>
      <Container>
        <CandidatoCard candidato={candidato}/>

      </Container>
    
    </>
  )
}
