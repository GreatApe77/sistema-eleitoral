import { task } from "hardhat/config";
import { VotacaoType } from "../test/utils/VotacaoType";
task(
    "votar",
    "Votar em um candidato"
)
.addParam("sistemaEleitoral", "Endereço do contrato do sistema eleitoral")
.addParam("anoDaEleicao", "Ano da eleição")
.addParam("candidato", "Número do candidato")
.addOptionalParam("accountIndex", "Índice da conta que irá votar")
.setAction(async (taskArgs, hre) => {
    const signers = await hre.ethers.getSigners();
    const index = taskArgs.accountIndex ? parseInt(taskArgs.accountIndex) : 0;
    const eleitor = signers[index]

    const sistemaEleitoral = await hre.ethers.getContractAt("SistemaEleitoral",taskArgs.sistemaEleitoral,eleitor)
    const nonce  = await sistemaEleitoral.nonces(eleitor.address)
    const prazo = Math.floor(Date.now()/1000) + 300 // 5 minutos
    const domain = {
        name: "Sistema Eleitoral",
        version: "1",
        chainId: hre.network.config.chainId,
        verifyingContract: taskArgs.sistemaEleitoral
    }

    const values = {
        anoDaEleicao: taskArgs.anoDaEleicao,
        assinante: eleitor.address,
        numeroDoCandidato: taskArgs.candidato,
        nonce: nonce,
        prazo: prazo
    }
    const signature = await eleitor.signTypedData(domain,VotacaoType,values)
    const {v,r,s} = hre.ethers.Signature.from(signature)
    const transactionHash = await sistemaEleitoral.votar(
        taskArgs.anoDaEleicao,
        taskArgs.candidato,
        eleitor.address,
        prazo,
        v,
        r,
        s
    )
    console.log(`Transação concluida: ${transactionHash.hash}`)

})