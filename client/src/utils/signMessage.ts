import { ethers } from "ethers";
export async function signMessage(privateKey:string,message:string){
    const wallet = new ethers.Wallet(privateKey)
    const signature = await wallet.signMessage(message)
    return signature

}