import { createContext, useState, Dispatch, SetStateAction } from "react";
export type FormularioCpf = {
    cpf: string;
    
};




type FormularioCpfContextType = {
    formularioCpf: FormularioCpf;
    setFormularioCpf: Dispatch<SetStateAction<FormularioCpf>>;
};
export const FormularioCpfContext = createContext({} as FormularioCpfContextType);
type Props = {
	children: React.ReactNode;
};

export const FormularioCpfProvider = ({ children }: Props) => {
	/* const [localWallet, setLocalWallet] = useState<LocalWallet>({
        localWalletPublicKey: localStorage.getItem("LocalWallet__publickey") || "",
        localWalletPrivateKey: localStorage.getItem("LocalWallet__privatekey") || "",
    }); */

    const [formularioCpf, setFormularioCpf] = useState<FormularioCpf>({
        cpf:  "",
    });
    
	

	
	const contextValue = {
		formularioCpf,
        setFormularioCpf,
	};
	return (
		<FormularioCpfContext.Provider value={contextValue}>
			{children}
		</FormularioCpfContext.Provider>
	);
};