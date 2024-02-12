import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssBaseline } from '@mui/material'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { PAGINAS } from './constants/PAGINAS.tsx'
import { LocalWalletProvider } from './contexts/LocalWalletContext.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:PAGINAS.map((pagina)=>{
      return {
        path: pagina.rota,
        element: pagina.componente
      }
    }) ,
  },

])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssBaseline />
    <LocalWalletProvider>

    <RouterProvider router={router}/>
    </LocalWalletProvider>
  </React.StrictMode>,
)
