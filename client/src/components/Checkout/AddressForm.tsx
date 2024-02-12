/* eslint-disable @typescript-eslint/no-unused-vars */

import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

import { Button } from '@mui/material';
import { LocalWalletContext } from '../../contexts/LocalWalletContext';
import { generateWallet } from '../../utils/generateWallet';
import { generateCpf } from '../../utils/generateCpf';
import { FormularioCpfContext } from '../../contexts/FormularioCpfContext';
import { formatCpfToScreen } from '../../utils/formatCpfToScreen';

export default function AddressForm() {
    const {localWallet,setLocalWallet} = React.useContext(LocalWalletContext)
    const {formularioCpf,setFormularioCpf} = React.useContext(FormularioCpfContext)
    function handleGenerateNewWallet(){
        const {publicKey,privateKey} = generateWallet()
        localStorage.setItem('LocalWallet__publickey', publicKey)
        localStorage.setItem('LocalWallet__privatekey', privateKey)
        setLocalWallet({
            localWalletPublicKey: publicKey,
            localWalletPrivateKey: privateKey
        })
    }
    function handleGenerateCpf(){
        setFormularioCpf({
            cpf: generateCpf()
        })
    }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Informaçoes do Eleitor
      </Typography>
      <Grid container spacing={3}>
        
        <Grid item xs={12}>
          <TextField
            required
            id="publicKey"
            name="publicKey"
            label="Chave Pública"
            fullWidth
            autoComplete="publicKey"
            variant="standard"
            value={localWallet.localWalletPublicKey}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="privateKey"
            name="privateKey"
            label="Chave Privada"
            fullWidth
            autoComplete="privateKey"
            variant="standard"
            value={localWallet.localWalletPrivateKey}
          />
        </Grid>
        <Grid item xs={12} >
          <Button onClick={handleGenerateNewWallet}>
            Gerar Novas Chaves
          </Button>
        </Grid>
        
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cpf"
            name="cpf"
            label="CPF"
            fullWidth
            autoComplete="cpf"
            variant="standard"
            value={formatCpfToScreen(formularioCpf.cpf)}
          />
          
        </Grid>
       
        <Grid item xs={12}  >
          <Button onClick={handleGenerateCpf}>
            Gerar CPF
          </Button>
        </Grid>
        
      </Grid>
    </React.Fragment>
  );
}