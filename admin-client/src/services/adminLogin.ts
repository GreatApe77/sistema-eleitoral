import { SERVER_URL } from "../constants/environment"

export async function adminLogin(ultraSecretPassword:string){
   console.log(ultraSecretPassword)
    try {
        const response = await fetch(`${SERVER_URL}/admin/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                
            },
            body:JSON.stringify({ultraSecretPassword})
        })
        console.log(response.status)
        const data = await response.json()
        return {
            statusCode:response.status,
            data:data
        }
    } catch (error) {
        throw new Error("Could not admin Login")
    }
}