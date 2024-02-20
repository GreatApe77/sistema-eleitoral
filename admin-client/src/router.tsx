import { createBrowserRouter } from "react-router-dom"
import App from "./App"
import { PAGES } from "./constants/PAGES"

export const router = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      children:PAGES.map(page=>{
        return {
            path: page.path,
            element: page.component
        }
      }) ,
    },
  
  ])
  