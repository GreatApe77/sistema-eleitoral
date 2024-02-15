import { Outlet } from "react-router-dom"
import NavBar from "./components/NavBar"
import { VotosProvider } from "./contexts/ResultadoContext"
import { CandidatosProvider } from "./contexts/CandidatosContext"
import { StatusProvider } from "./contexts/StatusContext"



function App() {
  /* getCandidatos("2000", 0, 10).then((candidatos)=>{console.log(candidatos[0].nome)}).catch(console.error) */

  return (
    <>
      <NavBar />
      <VotosProvider>
        <CandidatosProvider>
          <StatusProvider>

          <Outlet />
          </StatusProvider>

        </CandidatosProvider>

      </VotosProvider>
    </>
  )
}

export default App
