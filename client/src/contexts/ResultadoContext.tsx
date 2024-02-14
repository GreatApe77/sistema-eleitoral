/* import { createContext, useState } from "react";
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
}; */

import { createContext, useState } from "react";
import { Votos } from "../types/Votos";


type VotosContextType = {
    votos:Votos,
    setVotos: (votos: Votos) => void;
}
export const VotosContext = createContext({} as VotosContextType);

type Props = {
    children: React.ReactNode;
};

export const VotosProvider = ({ children }: Props) => {
    const [votos, setVotos] = useState<Votos>({
        quantidadeDeVotos: 0,
        quantidadeDeVotosValidos: 0,
        quantidadeDeVotosBrancos: 0,
        quantidadeDeVotosNulos: 0,
    });
    const contextValue = {
        votos,
        setVotos,
    };
    return (
        <VotosContext.Provider value={contextValue}>
            {children}
        </VotosContext.Provider>
    );
};