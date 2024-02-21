import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { adminLogin } from '../../services/adminLogin';
import { useNavigate } from 'react-router-dom';
import { PAGES } from '../../constants/PAGES';


export  function LoginForm() {
  const [password, setPassword] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [errorMsg, setErrorMsg] = React.useState("")
  const navigate = useNavigate()
  function handleSubmit (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(!password) return
    setLoading(true)
    setErrorMsg("")
    adminLogin(password)
    .then((response)=>{
      console.log(response)
      if(response.statusCode===200){
        localStorage.setItem("token",response.data.token)
        navigate(PAGES.find(page=>page.name==="Dashboard")?.path||"/")
      }
      else{
        setErrorMsg(response.data.message||"Ocorreu um erro")
      }
    })
    .catch((error)=>{
      console.error(error)
      setErrorMsg(error.message||"Ocorreu um erro")
    })
    .finally(()=>{
      setLoading(false)
    })
    
  }

  return (
    
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
             Login admnistrativo
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            
            <TextField
              margin="normal"
              required
              fullWidth
              disabled={loading}
              variant='outlined'
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e=>setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember"  color="primary" />}
              label="Manter conectado ?"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading?"Carregando...":"Entrar"}
            </Button>
            <Typography  color="error">{errorMsg}</Typography>
            
          </Box>
        </Box>
        
      </Container>
    
  );
}