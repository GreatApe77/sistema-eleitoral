import { sistemaEleitoraInstance } from "../web3-services/config";

const avaiableMethods:string[] = [
    sistemaEleitoraInstance.getFunction("anexarEleicao").name,
    sistemaEleitoraInstance.getFunction("cadastrarCandidato").name,
    sistemaEleitoraInstance.getFunction("candidatoPorNumero").name,
    sistemaEleitoraInstance.getFunction("encerrarEleicao").name,
    sistemaEleitoraInstance.getFunction("nonces").name,
    sistemaEleitoraInstance.getFunction("getPermissaoDeVoto").name,
    sistemaEleitoraInstance.getFunction("iniciarEleicao").name,
    sistemaEleitoraInstance.getFunction("retiraAprovacaoDeEleitores").name,
    sistemaEleitoraInstance.getFunction("votar").name,
]

const isAvaibleMethod =   new Map<String,boolean>()

avaiableMethods.forEach((method)=>{
    isAvaibleMethod.set(method,true)
})
export {
    isAvaibleMethod
}