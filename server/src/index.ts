import {app,PORT} from "./app"
import connectDB from "./database/connect"


async function main(){
    await connectDB()

    app.listen(PORT,()=>{
        console.log(`Server running on port ${PORT}`)
    })
}

main()
.catch((error)=>{
    console.error(error)
    process.exit(1)
})