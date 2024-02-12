/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { formatCpfToScreen } from '../../utils/formatCpfToScreen';
import { LocalWalletContext } from '../../contexts/LocalWalletContext';
import { FormularioCpfContext } from '../../contexts/FormularioCpfContext';




export default function Review() {
    const {localWallet} = React.useContext(LocalWalletContext)
    const {formularioCpf} = React.useContext(FormularioCpfContext)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Revise seu cadastro
      </Typography>
      <List disablePadding>
       
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Chave Pública"} secondary={localWallet.localWalletPublicKey} />
            
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"Chave Pública"} secondary={localWallet.localWalletPrivateKey} />
            
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primary={"CPF"} secondary={formatCpfToScreen(formularioCpf.cpf)} />
            
          </ListItem>
        
       
      </List>
      
    </React.Fragment>
  );
}