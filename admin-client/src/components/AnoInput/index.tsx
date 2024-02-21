import { TextField } from '@mui/material'

export default function AnoInput() {

  return (
    <TextField
    required
    
    name="ano"
    label="Ano..."
    type="number"
    InputProps={{ inputProps: { min: 1000, max: 9999 } }}
    fullWidth
   
    variant='filled'
    ></TextField>
  )
}
