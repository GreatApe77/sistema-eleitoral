import { Container } from "@mui/material";
import Checkout from "../components/Checkout/Checkout";
import { FormularioCpfProvider } from "../contexts/FormularioCpfContext";

export default function RegistrarCidadania() {
  return (
    <>
     <Container>
      <FormularioCpfProvider>
            <Checkout/>

      </FormularioCpfProvider>
            
      </Container>
    
    </>
  )
}
