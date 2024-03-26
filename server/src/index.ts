import {app,PORT} from "./app"
import connectDB from "./database/connect"
import { sistemaEleitoraInstance } from "./web3-services/config"


async function main(){
    await connectDB()
    console.log(await sistemaEleitoraInstance.owner())
    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
}

main()
.catch((error)=>{
    console.error(error)
    process.exit(1)
})