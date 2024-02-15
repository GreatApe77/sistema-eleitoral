import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import { Avatar, Paper } from '@mui/material';
import { CandidatosContext } from '../../contexts/CandidatosContext';


const columns: GridColDef[] = [
    {
        field: 'fotoDoCandidatoUrl',
        headerName: 'Foto',
        renderCell: ({row}) =>{
            return <Avatar src={row.fotoDoCandidatoUrl} />
        },
        
        
        sortable: false,
        width: 90,
      },
      { field: 'nome', headerName: 'Nome', width: 130 },
  { field: 'quantidadeDeVotos', headerName: 'Votos', width: 100 },
  { field: 'partido', headerName: 'Partido', width: 130 },
  
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

/* const rows = candidatosMockArray.map((candidato, index) => {
    return {
        ...candidato,
        id: index
    }
}) */

export default function CandidatosTable() {
  const {candidatos} = React.useContext(CandidatosContext)
  return (
    

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={candidatos.map((candidato, index) => {return {...candidato, id: index}})}
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
