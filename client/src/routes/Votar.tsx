import { Container } from "@mui/material";
import VotoCheckout from "../components/VotoCheckout";
import { DadosDeVotacaoProvider } from "../contexts/DadosDeVotacaoContext";


export default function Votar() {
  return (
    <>
      <DadosDeVotacaoProvider>



        <Container>
            <VotoCheckout />
        </Container>
    
      </DadosDeVotacaoProvider>
    
    
    </>
  )
}
