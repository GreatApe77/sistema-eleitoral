import  { useContext } from 'react'
import { ColorModeContext } from '../../theme'
import { IconButton, useTheme } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


export default function ThemeSwitcher() {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)
  return (
    <>
        <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </IconButton>
    </>
  )
}
