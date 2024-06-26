/* eslint-disable @typescript-eslint/no-unused-vars */

import { Container, Typography } from "@mui/material";

import SearchEleicao from "../components/SearchEleicao";
import CandidatosTable from "../components/CandidatosTable";
import { CandidatosContext } from "../contexts/CandidatosContext";
import TabelaVotos from "../components/TabelaVotos";
import { VotosContext } from "../contexts/ResultadoContext";
import { useContext } from "react";

import { IndicadorDeStatus } from "../components/IndicadorDeStatus";
import { StatusContext } from "../contexts/StatusContext";
import { StatusDaEleicao } from "../types/StatusDaEleicao";
import CandidatoCard from "../components/CandidatoCard";

export default function Resultados() {
  const { votos } = useContext(VotosContext)
  const { candidatos } = useContext(CandidatosContext)
  const { statusDaEleicao } = useContext(StatusContext)
  const vencedor = candidatos.reduce((prev, current) => (prev.quantidadeDeVotos > current.quantidadeDeVotos) ? prev : current, {
    quantidadeDeVotos: 0,
    nome: "",
    fotoDoCandidatoUrl: "",
    indice: 0,
    numeroDeVotacao: 0,
    partido: ""
  })
  return (
    <>
      <>

        <Container maxWidth="xl">

          <SearchEleicao />
          {
            statusDaEleicao !== null &&
            <IndicadorDeStatus />
          }
          {
            statusDaEleicao === StatusDaEleicao.ENCERRADA && vencedor.quantidadeDeVotos > 0 ?
              <>
                <Typography variant="h6" gutterBottom>

                  Vencedor
                </Typography>
                <CandidatoCard candidato={vencedor} />
              </> :
              <></>
          }
          {
            candidatos.length ?
              <>
                <Typography variant="h6" gutterBottom marginTop={3}>
                  Tabela de Candidatos
                </Typography>

                <CandidatosTable />
              </>
              :
              <>

              </>
          }
          {
            votos.quantidadeDeVotos > 0 &&
            <>
            <Typography variant="h6" gutterBottom marginTop={3}>
              Tabela de Votos
            </Typography>
            <TabelaVotos />
            </>
          }

        </Container>


      </>
    </>
  )
}
