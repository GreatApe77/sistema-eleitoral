import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { PAGINAS } from "./constants/PAGINAS"

export const router = createBrowserRouter([
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
  