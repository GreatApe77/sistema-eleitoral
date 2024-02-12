import { createContext, useState, Dispatch, SetStateAction } from "react";

export type LocalWallet = {
    localWalletPublicKey: string;
    localWalletPrivateKey: string;
    
};

type LocalWalletContextType = {
    localWallet: LocalWallet ;
    setLocalWallet: Dispatch<SetStateAction<LocalWallet >>;
};


export const LocalWalletContext = createContext({} as LocalWalletContextType);
type Props = {
	children: React.ReactNode;
};
export const LocalWalletProvider = ({ children }: Props) => {
	const [localWallet, setLocalWallet] = useState<LocalWallet>({
        localWalletPublicKey: localStorage.getItem("LocalWallet__publickey") || "",
        localWalletPrivateKey: localStorage.getItem("LocalWallet__privatekey") || "",
    });
    
	

	
	const contextValue = {
		localWallet,
        setLocalWallet,
	};
	return (
		<LocalWalletContext.Provider value={contextValue}>
			{children}
		</LocalWalletContext.Provider>
	);
};