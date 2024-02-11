import { IconButton, Snackbar } from '@mui/material'
import  { useState } from 'react'
import ContentCopy from '@mui/icons-material/ContentCopy'
export default function CopyToClipboardBtn({text}: {text: string}) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        window.navigator.clipboard.writeText(text)
        setOpen(true);
      };
      const handleClose = (_event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  return (
    <>
    
        <IconButton onClick={handleClick} >
            <ContentCopy color={open?"info":"action"}/>
        </IconButton>

        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={2000}
            onClose={handleClose}
            message="Copiado para a área de transferência"
            
        >

        </Snackbar>
    </>
  )
}
