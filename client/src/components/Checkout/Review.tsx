/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import { formatCpfToScreen } from '../../utils/formatCpfToScreen';
import { LocalWalletContext } from '../../contexts/LocalWalletContext';
import { FormularioCpfContext } from '../../contexts/FormularioCpfContext';
import { formatWalletToScreen } from '../../utils/formatWalletToScreen';
import { ListItemIcon } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LockIcon from '@mui/icons-material/Lock';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

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
            <ListItemIcon>
              <LockOpenIcon />
            </ListItemIcon>
            <ListItemText primary={"Chave Pública"} secondary={formatWalletToScreen(localWallet.localWalletPublicKey)} />
            
          </ListItem>
          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemIcon>
              <LockIcon />
            </ListItemIcon>
            <ListItemText primary={"Chave Privada"} secondary={formatWalletToScreen(localWallet.localWalletPrivateKey)} />
            
          </ListItem>
          
          <ListItem  sx={{ py: 1, px: 0 }}>
          <ListItemIcon>
            <PermIdentityIcon />
          </ListItemIcon>
            <ListItemText primary={"CPF"} secondary={formatCpfToScreen(formularioCpf.cpf)} />
            
          </ListItem>
        
       
      </List>
      
    </React.Fragment>
  );
}