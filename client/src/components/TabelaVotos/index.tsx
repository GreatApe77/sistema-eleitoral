import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { VotosContext } from '../../contexts/ResultadoContext';

export default function TabelaVotos() {
  const {votos} = React.useContext(VotosContext)
  return (
    <BarChart
  xAxis={[
    {
      id: 'barCategories',
      data: ['Total', 'Válidos', 'Brancos', 'Nulos'],
      scaleType: 'band',
    },
  ]}
  series={[
    {
      data: [votos.quantidadeDeVotos, votos.quantidadeDeVotosValidos, votos.quantidadeDeVotosBrancos,votos.quantidadeDeVotosNulos],
    },
  ]}
  height={300}
  sx={{ width: 300, height: 300}}
/>
  );
}