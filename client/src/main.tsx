import React from 'react'
import ReactDOM from 'react-dom/client'
import { CssBaseline } from '@mui/material'
import { RouterProvider } from 'react-router-dom'
import { LocalWalletProvider } from './contexts/LocalWalletContext.tsx'
import { router } from './router.tsx'
import { ThemeProvider } from '@emotion/react'
import { theme } from './theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <LocalWalletProvider>

    <RouterProvider router={router}/>
    </LocalWalletProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
