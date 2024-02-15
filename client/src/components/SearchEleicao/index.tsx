import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';

import InputBase from '@mui/material/InputBase';

import SearchIcon from '@mui/icons-material/Search';
import { Button, CircularProgress } from '@mui/material';
import { useContext, useState } from 'react';
import { getCandidatos } from '../../web3-services/getCandidatos';
import { CandidatosContext } from '../../contexts/CandidatosContext';
import { Candidato } from '../../types/Candidato';
import { VotosContext } from '../../contexts/ResultadoContext';
import { getResultado } from '../../web3-services/getResultado';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchEleicao() {
  const [ano, setAno] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false)
  const {setCandidatos} = useContext(CandidatosContext)
  const {setVotos} = useContext(VotosContext)
    async function handleCandidatosSearch(){
      if(ano.length !== 4) return
      setLoading(true)

      try{
        const [candidatos,votos] = await Promise.all([getCandidatos(ano,0,20),getResultado(ano)])
        setCandidatos(candidatos)
        setVotos(votos)
      }catch(err){
        console.error(err)
      }finally{
        setLoading(false)
      }

      /* getCandidatos(ano,0,20)
      .then((candidatos) => {
        setCandidatos()
      })
      .catch((err) => {
        console.error(err)
      })
      .finally(()=>{
        setLoading(false)
      
      }) */
    }
    function handleAnoChange(event: React.ChangeEvent<HTMLInputElement>){
      setAno(event.target.value)
    }
  return (
    <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color='transparent' elevation={0}>
        
        <Toolbar>
          
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Ano..."
              inputProps={{ 'aria-label': 'search' }}
              value={ano}
              type='number'
              onChange={handleAnoChange}
            />
          </Search>
          <Button disabled={loading}  variant="text" color="primary" onClick={handleCandidatosSearch}>
            {loading ? <CircularProgress size={24} color="primary"/> : "Buscar"}
            </Button>
            
        </Toolbar>
      </AppBar>
    </Box>
  );
}