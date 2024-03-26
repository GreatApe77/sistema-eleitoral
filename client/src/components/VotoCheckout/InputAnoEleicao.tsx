import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import { DadosDeVotacaoContext } from '../../contexts/DadosDeVotacaoContext'

export default function InputAnoEleicao() {
    const {setDadosDeVotacao} = useContext(DadosDeVotacaoContext)
    function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
        
        setDadosDeVotacao((prev)=>{
            return {
                ...prev,
                anoDaEleicao:event.target.value
            }
        })
    }
  return (
    <>
        <TextField
            required
            id="ano"
            name="ano"
            label="Ano..."
            type='number'
            InputProps={{ inputProps: { min: 1000, max: 9999 } }}
            fullWidth
            autoComplete="cpf"
            variant="filled"
            onChange={handleOnChange}
            
          />
    
    </>
  )
}
