import { Button } from '@mui/material'
import {ethers} from "ethers"
import { useEffect, useState } from 'react'

export default function GenerateWalletBtn({ ...props}: React.ComponentProps<typeof Button>) {
    
    const [walletAddress, setWalletAddress] = useState('')
    useEffect(() => {
        const walletAddress = localStorage.getItem('walletAddress')
        if(walletAddress){
            setWalletAddress(walletAddress)
        }
    },[])
    function formatWalletAddress(walletAddress: string) {
        return walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4, walletAddress.length)
    }
    function generateWallet() {
        const wallet = ethers.Wallet.createRandom()
        setWalletAddress(wallet.address)
        localStorage.setItem('walletAddress', wallet.address)
        localStorage.setItem('walletPrivateKey', wallet.privateKey)
    }
  return (
    <Button   {...props}  onClick={generateWallet}>{walletAddress?formatWalletAddress(walletAddress):"Gerar Carteira"}</Button>
  )
}
