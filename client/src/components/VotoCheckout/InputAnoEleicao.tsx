import { TextField } from '@mui/material'
import React, { useContext } from 'react'
import { DadosDeVotacaoContext } from '../../contexts/DadosDeVotacaoContext'
import { eleicaoExiste } from '../../web3-services/eleixaoExiste'
import { getStatus } from '../../web3-services/getStatus'
import { StatusDaEleicao } from '../../types/StatusDaEleicao'
import { useNavigate } from 'react-router-dom'

export default function InputAnoEleicao() {
  const { setDadosDeVotacao } = useContext(DadosDeVotacaoContext)
  const navigate = useNavigate()
  async function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const anoDeEleicao = event.target.value
    if (anoDeEleicao.length === 4) {
      console.log(anoDeEleicao)
      //const [exist,status] = await Promise.all([eleicaoExiste(anoDeEleicao),getStatus(anoDeEleicao)])
      const exist = await eleicaoExiste(anoDeEleicao)

      if (!exist) {

        alert("Eleição não existe")
        return navigate("/")
      }
      const status = await getStatus(anoDeEleicao)

      if (status !== StatusDaEleicao.ATIVA) {
        alert("Eleição Não Está Ativa")
        return navigate("/")
      }

    }

    setDadosDeVotacao((prev) => {
      return {
        ...prev,
        anoDaEleicao: anoDeEleicao
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
