import React, { createContext, useState } from "react";
import { StatusDaEleicao } from "../types/StatusDaEleicao";

type StatusContextType= {
    statusDaEleicao: StatusDaEleicao| null,
    setStatusDaEleicao: (statusDaEleicao:StatusDaEleicao | null)=> void
}
export const StatusContext = createContext({} as StatusContextType)

type Props={
    children:React.ReactNode
}
export function StatusProvider({children} :Props){
    const [statusDaEleicao,setStatusDaEleicao] = useState<StatusDaEleicao| null>(null)


    return (
        <StatusContext.Provider value={{statusDaEleicao,setStatusDaEleicao}}>
            {children}
        </StatusContext.Provider>
    )
}