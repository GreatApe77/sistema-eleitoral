import { ethers } from "hardhat";

export function getRandomAccounts(numberOfAccounts: number) {
    const accounts = [];
    for (let i = 0; i < numberOfAccounts; i++) {
      accounts.push(ethers.Wallet.createRandom());
    }
    return accounts;
  }