
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

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
import { login } from '../../services/login';
import { Alert, CircularProgress, Snackbar } from '@mui/material';
import KeyIcon from '@mui/icons-material/Key';



export default function SignIn() {
  const [currentTimestamp, setCurrentTimestamp] = React.useState<number>(Date.now());
  const [timestampSnapshot, setTimestampSnapshot] = React.useState<number>(0);
  const [signature, setSignature] = React.useState<string>("")
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const { localWallet } = React.useContext(LocalWalletContext)
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = React.useState<string>("")


  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    setErrorMessage("")
    login(localWallet.localWalletPublicKey, signature, timestampSnapshot)
      .then((result) => {
        if (result.statusCode === 200) {
          localStorage.setItem("token", result.data.token)

          navigate("/resultados")
        } else if (result.statusCode.toString().startsWith("4")) {
          setErrorMessage("Chave privada já utilizada ou a assinatura é antiga. Assine e tente novamente.")
          setOpen(true)
        }
      }).catch((err) => {
        console.error(err)
        setErrorMessage("Erro ao tentar se autenticar. Tente novamente.")
        setOpen(true)
      }).finally(() => {
        setLoading(false)
      })
  }
  function handleSignature() {
    setTimestampSnapshot(currentTimestamp)
    signMessage(localWallet.localWalletPrivateKey, getLoginMessage(currentTimestamp))
      .then((signature) => {
        setSignature(signature)
      })
      .catch((error) => {
        console.error(error)
        navigate("/registrar-cidadania")
      })
  }
  function updateTimestampEverySecond() {
    setInterval(()=>{
      setCurrentTimestamp(Date.now())
    },1000)
  }
  React.useEffect(() => {
    updateTimestampEverySecond()
  }, [])
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
        <Box component="form" onSubmit={handleSubmit}  sx={{ mt: 1 }}>
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
          {localWallet.localWalletPrivateKey ? <Button
            type="button"
            fullWidth
            variant="outlined"
            color='secondary'
            onClick={handleSignature}
            sx={{ mt: 3 }}
            startIcon={<KeyIcon />}
          >
            Assinar mensagem
          </Button> : <></>}
          <Button
            type="submit"
            disabled={loading}
            startIcon={loading?<CircularProgress size={"small"}/>:<></>}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid container>

            <Grid item>
              <Link underline='hover' variant="body2" component={LinkReactRouterDom} to={"/registrar-cidadania"}>
                Não tem cadastro? Registre-se como cidadão AQUI
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}

      >
        <Alert onClose={handleClose} severity="error" >
          {errorMessage}
        </Alert>

      </Snackbar>
    </Container>

  );
}