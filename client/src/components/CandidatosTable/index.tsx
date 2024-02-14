import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Candidato } from '../CandidatoCard';
import { Avatar } from '@mui/material';
const candidato: Candidato = {
    nome: "Carlos Santos",
    partido: "Partido B",
    fotoDoCandidatoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjA7danCZ0VWhzi4j7vjzm4rjBY9eN9mrCog-AHF9cKS2_4Mj8NCLPcZy_fyb1RE6Q2J0&usqp=CAU",
    quantidadeDeVotos: 0,
    numeroDeVotacao: 99,
    indice: 0
  
  } 
const candidatosMockArray: Candidato[] = new Array(20).fill(candidato)
const columns: GridColDef[] = [
  { field: 'quantidadeDeVotos', headerName: 'Número de votos', width: 150 },
  { field: 'nome', headerName: 'Nome', width: 130 },
  { field: 'partido', headerName: 'Partido', width: 130 },
  {
    field: 'fotoDoCandidatoUrl',
    headerName: 'Foto',
    renderCell: ({row}) =>{
        return <Avatar src={row.fotoDoCandidatoUrl} />
    },
    minWidth: 100,
    
    sortable: false,
    width: 90,
  },
  { field: 'numeroDeVotacao', headerName: 'Número', width: 130 },
  /* {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  }, */
];

const rows = candidatosMockArray.map((candidato, index) => {
    return {
        ...candidato,
        id: index
    }
})

export default function CandidatosTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        
      />
    </div>
  );
}
