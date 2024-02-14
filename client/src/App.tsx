import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"



function App() {
  /* getCandidatos("2000", 0, 10).then((candidatos)=>{console.log(candidatos[0].nome)}).catch(console.error) */

  return (
    <>
      <NavBar />

        <Outlet />  
    </>
  )
}

export default App
