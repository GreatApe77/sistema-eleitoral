/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Container, Divider, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchEleicao from "../components/SearchEleicao";
import CandidatosTable from "../components/CandidatosTable";
import { CandidatosProvider } from "../contexts/CandidatosContext";
import TabelaVotos from "../components/TabelaVotos";
import { VotosContext, VotosProvider } from "../contexts/ResultadoContext";
import { useContext } from "react";

export default function Resultados() {
  const {votos} = useContext(VotosContext)
  return (
    <>
    <CandidatosProvider>
      
      <Container>
        <Typography variant="h4" gutterBottom>
          Resultados
        </Typography>
        <SearchEleicao/>
        
        <CandidatosTable/>
        {
          votos.quantidadeDeVotos > 0 &&
        <TabelaVotos/>
        }
      
      </Container>
      
      
      </CandidatosProvider>
    </>
  )
}
