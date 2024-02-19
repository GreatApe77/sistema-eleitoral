import { createContext, useState } from "react";
import { DadosDeVotacao } from "../types/DadosDeVotacao";

type DadosDeVotacaoContextType = {
    dadosDeVotacao: DadosDeVotacao;
    setDadosDeVotacao : React.Dispatch<React.SetStateAction<DadosDeVotacao>>;
};

export const DadosDeVotacaoContext = createContext({}as DadosDeVotacaoContextType);


type Props = {
    children: React.ReactNode;
};

export function DadosDeVotacaoProvider  ({ children }: Props) {
        const [dadosDeVotacao, setDadosDeVotacao] = useState<DadosDeVotacao>({
            anoDaEleicao: "",
            chavePublica: "",
            numeroDoCandidato: "",
            prazo: 0,
            signature: "",
        } as DadosDeVotacao)

        const contextValue = {
            dadosDeVotacao,
            setDadosDeVotacao,
        
        }
    return (
        <DadosDeVotacaoContext.Provider value={contextValue}>
            {children}
        </DadosDeVotacaoContext.Provider>
    );
}


