import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Typography } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import {  useContext } from "react";
import { generateWallet } from "../utils/generateWallet";
import CopyToClipboardBtn from "../components/CopyToClipboardBtn";
import { LocalWalletContext } from "../contexts/LocalWalletContext";
export default function CarteiraVirtual() {
    const {localWallet,setLocalWallet} = useContext(LocalWalletContext)
    
    function handleGenerateWallet(){
        const { publicKey,privateKey } = generateWallet()
        localStorage.setItem('LocalWallet__publickey', publicKey)
        localStorage.setItem('LocalWallet__privatekey', privateKey)
        setLocalWallet({
            localWalletPublicKey: publicKey,
            localWalletPrivateKey: privateKey
        })
    }
  return (
    <>
        <Container>
            <Typography variant="h2" gutterBottom>
                Gerencie sua carteira virtual
            </Typography>
            

            <Card elevation={4}>
                <CardHeader
                avatar={<Avatar><KeyIcon/></Avatar>}
                >

                    
                </CardHeader>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        Chave Pública
                        <CopyToClipboardBtn text={localWallet.localWalletPublicKey}/>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {/* {publicKey?publicKey:"Nenhuma carteira gerada"} */}
                        {localWallet.localWalletPublicKey?localWallet.localWalletPublicKey:"Nenhuma carteira gerada"}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Chave Privada 
                        <CopyToClipboardBtn text={localWallet.localWalletPrivateKey}/>
                    </Typography>
                    <Typography variant="body1" gutterBottom >
                        {localWallet.localWalletPrivateKey?localWallet.localWalletPrivateKey:"Nenhuma carteira gerada"}
                    </Typography>
                    <CardActions>
                        <Button variant="contained" color="primary" onClick={handleGenerateWallet}>Gerar Nova Carteira</Button>
                    </CardActions>
                </CardContent>
            </Card>
            
        </Container>
            
    </>
  )
}
