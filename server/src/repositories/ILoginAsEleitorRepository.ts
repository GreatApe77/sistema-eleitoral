export interface ILoginAsEleitorRepository{
    verifySignature(signerPublicKey:string,signature:string,timestampInMs:number):Promise<boolean|null>
    generateToken(signerPublicKey:string):Promise<string | null>
}