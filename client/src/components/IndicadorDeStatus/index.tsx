import { useContext } from "react"
import { StatusContext } from "../../contexts/StatusContext"
import { Typography } from "@mui/material"
import { StatusDaEleicao } from "../../types/StatusDaEleicao"

export function IndicadorDeStatus() {
    const {statusDaEleicao} = useContext(StatusContext)
    const statusMessageMap = {
        [StatusDaEleicao.ATIVA]: "EM PROGRESSO",
        [StatusDaEleicao.NAO_INICIADA]:"NÃO INICIADA",
        [StatusDaEleicao.ENCERRADA]:"ENCERRADA"
    }
    const colorMap = {
        [StatusDaEleicao.ATIVA]: "green",
        [StatusDaEleicao.NAO_INICIADA]:"orange",
        [StatusDaEleicao.ENCERRADA]:"red"
    }
    return (
    <>
        {
            statusDaEleicao !== null?
            <Typography variant="body1" /* color={colorMap[statusDaEleicao]} */ gutterBottom>
                Status: {" "} 
                <Typography variant="button" color={colorMap[statusDaEleicao]}  component="span">

                {statusMessageMap[statusDaEleicao]}
                </Typography>
            </Typography>:
            <Typography gutterBottom>
                Carregando Status...
            </Typography>
        } 
            
        
    
    </>
  )
}
