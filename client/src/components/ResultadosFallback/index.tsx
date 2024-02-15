import { Box, Container,  } from "@mui/material";
import chartIcon from "../../assets/bar-chart.svg"

export default function ResultadosFallback() {
  return (
    <Container maxWidth="md"sx={{ml:0}}>
        
        <Box component={"img"} width={"100%"}   src={chartIcon} >
            
        </Box>
    </Container>
  )
}
