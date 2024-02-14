/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Container, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import CandidatoCard, { Candidato } from "../components/CandidatoCard";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchEleicao from "../components/SearchEleicao";
const candidato: Candidato = {
  nome: "Carlos Santos",
  partido: "Partido B",
  fotoDoCandidatoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjA7danCZ0VWhzi4j7vjzm4rjBY9eN9mrCog-AHF9cKS2_4Mj8NCLPcZy_fyb1RE6Q2J0&usqp=CAU",
  quantidadeDeVotos: 0,
  numeroDeVotacao: 99,
  indice: 0

}
export default function Resultados() {
  return (
    <>
      <Container>
        <Typography variant="h4" gutterBottom>
          Resultados
        </Typography>
        <SearchEleicao/>
        
        {/* <Box>
          <TextField
            required
            id="anoDaEleicao"
            name="anoDaEleicao"
            label="Ano da Eleição"
            type="number"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarMonthIcon />
                </InputAdornment>
              ),
            }}

            autoComplete="anoDaEleicao"
            variant="filled"

          />
        </Box>
        <Button variant="contained" color="primary">
          Buscar
        </Button> */}

        {/* <CandidatoCard candidato={candidato} /> */}

      </Container>

    </>
  )
}
