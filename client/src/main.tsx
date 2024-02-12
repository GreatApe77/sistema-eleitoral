import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { LocalWalletProvider } from './contexts/LocalWalletContext.tsx'
import { router } from './router.tsx'
import ToggleColorMode from './theme.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToggleColorMode>
      <LocalWalletProvider>
        <RouterProvider router={router} />
      </LocalWalletProvider>
    </ToggleColorMode>
  </React.StrictMode>,
)
