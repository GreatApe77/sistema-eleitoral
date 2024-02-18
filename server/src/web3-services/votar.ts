import { AddressLike, BigNumberish, BytesLike } from "ethers";
import { sistemaEleitoraInstance } from "./config";

export async function votar(anoDeEleicao: BigNumberish, numeroDoCandidato: BigNumberish, eleitor: AddressLike, prazo: BigNumberish, v: BigNumberish, r: BytesLike, s: BytesLike): Promise<string> {
    const response = await sistemaEleitoraInstance.votar(anoDeEleicao,numeroDoCandidato,eleitor,prazo,v,r,s)
    return response.hash;
}


/* votar("1012") */
/* votar("1014","13","0x8274Cf5D8bFE3f5cb246bd8fA80dB31D544C5f30",1708258420,28,"0x9b077026effde366923f70540a711533db7754a30d9de6ed989e056fdbcf8cd9","0x26c1cc97e4c077d6e86bcebbf76ec4625789cb3dc48b7f6720131a5b48840336")

.then((response)=>{
    console.log(response)
}).catch((error)=>{
    console.error(error)
}) */