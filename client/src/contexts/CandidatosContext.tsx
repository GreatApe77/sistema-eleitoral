import { createContext, useState } from "react";
import { Candidato } from "../types/Candidato";

type CandidatosContextType = {
    candidatos:Candidato[],
    setCandidatos: (candidatos: Candidato[]) => void;
}
export const CandidatosContext = createContext({} as CandidatosContextType);


type Props = {
    children: React.ReactNode;
};

export const CandidatosProvider = ({ children }: Props) => {
    const [candidatos, setCandidatos] = useState<Candidato[]>([]);
    const contextValue = {
        candidatos,
        setCandidatos,
    };
    return (
        <CandidatosContext.Provider value={contextValue}>
            {children}
        </CandidatosContext.Provider>
    );
};