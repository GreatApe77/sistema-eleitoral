import { ThemeProvider, useTheme } from "@emotion/react"
import { Outlet } from "react-router-dom"




function App() {
    const theme =useTheme()
  return (
    <>
    <ThemeProvider theme={theme}>

     <Outlet />
    </ThemeProvider>
    </>
  )
}

export default App
