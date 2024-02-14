import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { getLoginMessage } from '../../utils/getLoginMessage';
import { Link as LinkReactRouterDom, useNavigate } from 'react-router-dom';
import { LocalWalletContext } from '../../contexts/LocalWalletContext';
import { signMessage } from '../../utils/signMessage';




export default function SignIn() {
  const [currentTimestamp, setCurrentTimestamp] = React.useState<number>(Date.now());
  const [signature, setSignature] = React.useState<string>('')
  const navigate = useNavigate()
  const {localWallet} = React.useContext(LocalWalletContext)
   function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    throw new Error("Function not implemented.");
   }
  function handleSignature(){
    signMessage(localWallet.localWalletPrivateKey,getLoginMessage(currentTimestamp))
    .then((signature)=>{
      setSignature(signature)
    })
    .catch((error)=>{
      console.error(error)
      navigate("/registrar-cidadania")
    })
  }
  React.useEffect(()=>{
    setInterval(()=>{
        setCurrentTimestamp(Date.now())
    },1000)
  },[])
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
            Login Com Carteira
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="publicKey"
              label="Chave Pública"
              name="publicKey"
              autoComplete="publicKey"
              value={localWallet.localWalletPublicKey}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="signature"
              label="Assinatura"
              type="text"
              id="signature"
              autoComplete="signature"
              value={signature}
            />
            <Typography variant="subtitle1" color="text.primary" >
                Assine a mensagem abaixo para se autenticar
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
                {getLoginMessage(currentTimestamp)}
            </Typography>
            {localWallet.localWalletPrivateKey?<Button
              type="button"
              fullWidth
              variant="outlined"
              color='secondary'
              onClick={handleSignature}
              sx={{ mt: 3 }}
            >
              Assinar mensagem
            </Button>: <></>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              
              <Grid item>
                <Link underline='hover'  variant="body2" component={LinkReactRouterDom} to={"/registrar-cidadania"}>
                  Não tem cadastro? Registre-se como cidadão AQUI
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    
  );
}