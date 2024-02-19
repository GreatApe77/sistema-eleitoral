import { Container } from "@mui/material";
import VotoCheckout from "../components/VotoCheckout";
import { FormularioCpfProvider } from "../contexts/FormularioCpfContext";


export default function Votar() {
  return (
    <>
    <FormularioCpfProvider>

        <Container>
            <VotoCheckout />
        </Container>
    </FormularioCpfProvider>
    
    
    </>
  )
}
