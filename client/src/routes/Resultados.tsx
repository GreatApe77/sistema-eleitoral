/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Container, Divider, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchEleicao from "../components/SearchEleicao";
import CandidatosTable from "../components/CandidatosTable";
import { CandidatosProvider } from "../contexts/CandidatosContext";

export default function Resultados() {
  return (
    <>
    <CandidatosProvider>
      <Container>
        <Typography variant="h4" gutterBottom>
          Resultados
        </Typography>
        <SearchEleicao/>
        
        <CandidatosTable/>
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
      </CandidatosProvider>
    </>
  )
}
