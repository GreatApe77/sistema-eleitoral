import { Avatar, Button, Card, CardActions, CardContent, CardHeader, Container, Typography } from "@mui/material";
import KeyIcon from '@mui/icons-material/Key';
import { useEffect, useState } from "react";
import { generateWallet } from "../utils/generateWallet";
import CopyToClipboardBtn from "../components/CopyToClipboardBtn";
export default function CarteiraVirtual() {
    const [publicKey, setPublicKey] = useState('')
    const [privateKey, setPrivateKey] = useState('')

    useEffect(() => {
        const publicKey = localStorage.getItem('LocalWallet__publickey')
        const privateKey = localStorage.getItem('LocalWallet__privatekey')
        if(publicKey && privateKey){
            setPublicKey(publicKey)
            setPrivateKey(privateKey)
        }
    },[])
    function handleGenerateWallet(){
        const { publicKey,privateKey } = generateWallet()
        localStorage.setItem('LocalWallet__publickey', publicKey)
        localStorage.setItem('LocalWallet__privatekey', privateKey)
        setPublicKey(publicKey)
        setPrivateKey(privateKey)
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
                        <CopyToClipboardBtn text={publicKey}/>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {publicKey?publicKey:"Nenhuma carteira gerada"}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Chave Privada 
                        <CopyToClipboardBtn text={privateKey}/>
                    </Typography>
                    <Typography variant="body1" gutterBottom >
                        {privateKey?privateKey:"Nenhuma carteira gerada"}
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
