import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import { VotosProvider } from "./contexts/ResultadoContext"
import { CandidatosProvider } from "./contexts/CandidatosContext"



function App() {
  /* getCandidatos("2000", 0, 10).then((candidatos)=>{console.log(candidatos[0].nome)}).catch(console.error) */

  return (
    <>
      <NavBar />
      <VotosProvider>
        <CandidatosProvider>
          <Outlet />

        </CandidatosProvider>

      </VotosProvider>
    </>
  )
}

export default App
