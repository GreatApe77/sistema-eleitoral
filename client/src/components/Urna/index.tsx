import { Avatar, Box, Button, Grid, Typography } from "@mui/material";
import { brancoBtnStyle, buttonStyle, confirmaBtnStyle, corrigirBtnStyle, numeroCandidatoStyle } from "./styles";
import { useContext, useEffect, useState } from "react";
import { DadosDeVotacaoContext } from "../../contexts/DadosDeVotacaoContext";
import { getCandidato } from "../../web3-services/getCandidato";
import { Candidato } from "../../types/Candidato";

export default function Urna() {
    const {dadosDeVotacao,setDadosDeVotacao} = useContext(DadosDeVotacaoContext)
    const [candidato,setCandidato] = useState<Candidato| null>(null)
    const primeiroNumero = dadosDeVotacao.numeroDoCandidato.length?dadosDeVotacao.numeroDoCandidato[0]:""
    const segundoNumero = dadosDeVotacao.numeroDoCandidato.length===2?dadosDeVotacao.numeroDoCandidato[1]:""
    useEffect(()=>{
        if(dadosDeVotacao.numeroDoCandidato.length===2 && dadosDeVotacao.anoDaEleicao.length>0){
            getCandidato(dadosDeVotacao.anoDaEleicao,dadosDeVotacao.numeroDoCandidato)
            .then((candidato)=>{
                setCandidato(candidato)
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },[dadosDeVotacao.numeroDoCandidato])
    function handleTecladoClick(e:React.MouseEvent<HTMLButtonElement>){
        if(dadosDeVotacao.numeroDoCandidato.length===2) return 
        const numero = e.currentTarget.textContent
        
        setDadosDeVotacao((prev)=>{
            if(prev.numeroDoCandidato.length<2){
                return {
                    ...prev,
                    numeroDoCandidato:prev.numeroDoCandidato+numero
                }
            }
            return prev
        
        })
    }

    function handleCorrigirClick(){
        setCandidato(null)
        setDadosDeVotacao((prev)=>{
            return {
                ...prev,
                numeroDoCandidato:""
            }
        })
    }
    return (
       
        <Box maxWidth={"sm"} padding={2} bgcolor={"#dad3c3"} borderRadius={1} >
             
            <Box bgcolor={"#e1e1e1"} padding={1} display={"flex"} justifyContent={"space-between"}>
                <Box  sx={{color:"black"}}>
                    <Typography variant={"body1"} gutterBottom>SEU VOTO PARA {dadosDeVotacao.anoDaEleicao}</Typography>
                    <Typography variant={"h5"} marginLeft={3} gutterBottom>PRESIDENTE</Typography>
                    <Box display={"flex"}>
                        <Typography variant={"body1"} marginRight={5} gutterBottom >
                            Número:
                        </Typography>
                        <Box sx={{ display: "flex" }}>
                            <Box sx={ numeroCandidatoStyle}>
                               {primeiroNumero}
                            </Box>
                            <Box sx={numeroCandidatoStyle}>
                                {segundoNumero}
                            </Box>
                        </Box>
                    </Box>
                    <Typography variant={"body1"} gutterBottom>Nome: {candidato?.nome}</Typography>
                    <Typography variant={"body1"} gutterBottom>Partido: {candidato?.partido}</Typography>
                </Box>
                <Box>
                    <Avatar variant="square" src={candidato?.fotoDoCandidatoUrl|| ""} sx={{ width: 50, height: 50 }} />
                </Box>
            </Box>
            <Box sx={{borderRadius:"0px 0px 10px 10px"}} bgcolor={"#313336"}>
                <Grid justifyContent={"center"} padding={3} container gap={2} columns={16}>

                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>1</Button>

                    </Grid>

                    <Grid item xs={4}>

                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>2</Button>
                    </Grid>
                    <Grid item xs={4}>

                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>3</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>4</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>5</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>6</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>7</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>8</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>9</Button>

                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleTecladoClick} fullWidth sx={buttonStyle}>0</Button>

                    </Grid>







                </Grid >
                <Grid justifyContent={"center"} padding={2} container gap={2} columns={16}>
                    <Grid item xs={4}>

                        <Button fullWidth sx={brancoBtnStyle}>Branco</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button onClick={handleCorrigirClick}  fullWidth sx={corrigirBtnStyle}>Corrige</Button>
                    </Grid>
                    <Grid item xs={4}>
                        <Button fullWidth sx={confirmaBtnStyle}>Confirma</Button>
                    </Grid>
                </Grid>

            </Box>
            
        </Box>
        
    )
}
