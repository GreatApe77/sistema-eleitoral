

import {ethers} from "ethers"


export function generateWallet() {
    const wallet = ethers.Wallet.createRandom()
    return { publicKey: wallet.address, privateKey: wallet.privateKey}
}