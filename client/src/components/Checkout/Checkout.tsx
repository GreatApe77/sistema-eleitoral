/* eslint-disable @typescript-eslint/no-unused-vars */



import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import EleitorForm from './EleitorForm';
import Review from './Review';
import { FormularioCpfContext, FormularioCpfProvider } from '../../contexts/FormularioCpfContext';
import { Alert, Divider, Snackbar, Stack } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { register } from '../../services/register';
import { LocalWalletContext } from '../../contexts/LocalWalletContext';



const steps = ['Preencha seus dados', 'Envie seus Dados'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <EleitorForm />;
    
    case 1:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [requiredMessage, setRequiredMessage] = React.useState("");
  const {formularioCpf} = React.useContext(FormularioCpfContext)
  
  const {localWallet} = React.useContext(LocalWalletContext)
  const handleNext = () => {
    /* if(activeStep==1){
      register(localWallet.localWalletPublicKey,formularioCpf.cpf)
      .then((response)=>{
        if(response.statusCode===201){
          setActiveStep(activeStep + 1);
        }else{
          setOpen(true);
        }
      })
      .catch((error:unknown)=>{
        console.error(error)
        setOpen(true);
      }).finally(()=>{
        setLoading(false);
      
      })

    }else{
      
      setActiveStep(activeStep + 1);
    } */
    setRequiredMessage("");
    switch (activeStep) {
      case 0:
        if(formularioCpf.cpf.length!==11 || !localWallet.localWalletPublicKey || !localWallet.localWalletPrivateKey){
          setRequiredMessage("Preencha todos os campos corretamente");
          return 
        }
        setActiveStep(activeStep + 1);
        break;
      case 1:
        setLoading(true);
        register(localWallet.localWalletPublicKey,formularioCpf.cpf)
        .then((response)=>{
          if(response.statusCode===201){
            setActiveStep(activeStep + 1);
          }else if(response.statusCode===400){
            setOpen(true);
            setRequiredMessage("Cidadão já está cadastrado!");
          }
        })
        .catch((error:unknown)=>{
          console.error(error)
          setOpen(true);
        }).finally(()=>{
          setLoading(false);
        
        })
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setRequiredMessage("");

    setActiveStep(activeStep - 1);
  };
  const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <React.Fragment>
     
      
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper  variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Registre sua Cidadania 
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Obrigado! Seu cadastro como cidadão foi realizado com sucesso.
              </Typography>
              <Typography variant="subtitle1">
                Agora você pode votar e participar das eleições.
              </Typography>
              <Stack direction={'row'} gap={3} >
                <Link component={ReactRouterDomLink} to={"/"} variant="body2">
                  Voltar para a página inicial
                </Link>
                <Divider orientation="vertical" flexItem />
                <Link href="/" variant="body2">
                  Verificar seu cadastro
                </Link>
              </Stack>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              {requiredMessage && <Typography color="error">{requiredMessage}</Typography>}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Voltar
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={loading}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 
                  `${loading ? 'Registrando...' : 'Registrar Cidadania'}` : 
                  'Próximo'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        
      </Container>
      <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            
            
        >
          <Alert severity='error' onClose={handleClose}>
            Erro ao registrar seus dados. Tente novamente.
          </Alert>
        </Snackbar>
        
      
    </React.Fragment>
  );
}