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
import { FormularioCpfProvider } from '../../contexts/FormularioCpfContext';
import { Divider, Stack } from '@mui/material';
import { Link as ReactRouterDomLink } from 'react-router-dom';



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

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
     <FormularioCpfProvider>
      
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                </Button>
              </Box>
            </React.Fragment>
          )}
        </Paper>
        
      </Container>

      </FormularioCpfProvider>
    </React.Fragment>
  );
}