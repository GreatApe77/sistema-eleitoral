/* eslint-disable @typescript-eslint/no-unused-vars */

import { Box, Button, Container, Divider, InputAdornment, TextField, Toolbar, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import SearchEleicao from "../components/SearchEleicao";
import CandidatosTable from "../components/CandidatosTable";
import { CandidatosContext, CandidatosProvider } from "../contexts/CandidatosContext";
import TabelaVotos from "../components/TabelaVotos";
import { VotosContext, VotosProvider } from "../contexts/ResultadoContext";
import { useContext } from "react";
import ResultadosFallback from "../components/ResultadosFallback";
import { IndicadorDeStatus } from "../components/IndicadorDeStatus";
import { StatusContext } from "../contexts/StatusContext";

export default function Resultados() {
  const { votos } = useContext(VotosContext)
  const { candidatos } = useContext(CandidatosContext)
  const {statusDaEleicao} = useContext(StatusContext)
  return (
    <>
      <>

        <Container>
          <Typography variant="h4" gutterBottom>
            Resultados
          </Typography>
          <SearchEleicao />
          {
            statusDaEleicao!==null &&
          <IndicadorDeStatus/>
          }
          {
            candidatos.length ?
              <CandidatosTable />
              :
              <>
              <ResultadosFallback/>
              </>
          }
          {
            votos.quantidadeDeVotos > 0 &&
            <TabelaVotos />
          }

        </Container>


      </>
    </>
  )
}
