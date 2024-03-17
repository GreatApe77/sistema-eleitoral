import { IEleitor } from "../../models/interfaces/IEleitor";

export interface IEleitorAuthService {
  register(eleitor: IEleitor): Promise<void>;
  //login(eleitor:Omit<IEleitor,"id">):Promise<string>
  verifySignature(signerPublicKey:string,signature:string,timestampInMs:number):boolean
  generateToken(signerPublicKey:string):string
}
