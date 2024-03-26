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

import { FormularioCpfContext } from '../../contexts/FormularioCpfContext';
import { Alert, Divider, Snackbar, Stack } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';
import { LocalWalletContext } from '../../contexts/LocalWalletContext';
import InputAnoEleicao from './InputAnoEleicao';
import Urna from '../Urna';



const steps = ['Escolha a Eleição', 'Escolha o seu Candidato'];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <InputAnoEleicao />;
    
    case 1:
      return <Urna />;
      
        
    default:
      throw new Error('Unknown step');
  }
}

export default function VotoCheckout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [loading] = React.useState(false);
  const [requiredMessage] = React.useState("");
  React.useContext(FormularioCpfContext)
  
  React.useContext(LocalWalletContext)
  const handleNext = () => {
   setActiveStep(prev=>prev+1)
  };

  const handleBack = () => {
    

    setActiveStep(prev=>prev-1);
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
            {
                activeStep === steps.length ? "Revisão do Voto" : "Votação"
            }
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
                {
                    activeStep === steps.length -1?
                    <></>
                    :
                    <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={loading }
                  sx={{ mt: 3, ml: 1 }}
                >
                    Próximo
                </Button>
                }
                
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