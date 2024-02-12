export function formatWalletToScreen(wallet:string) {
    if(wallet.length < 10) return wallet;
    return wallet.slice(0, 6) + "..." + wallet.slice(-4);
}