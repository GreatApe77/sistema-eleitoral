import "dotenv/config"
import { ethers } from "hardhat"

async function main (){
    const sistemaEleitoral = await ethers.getContractAt("SistemaEleitoral", process.env.SISTEMA_ELEITORAL_CONTRACT_ADDRESS!)
    
}


main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })