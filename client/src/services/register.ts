import { SERVER_URL } from "../constants/SERVER_URL";
import { ApiCall } from "../types/ApiCall";

export async function register(chavePublica:string,cpf:string){

    try {
        const response = await fetch(`${SERVER_URL}/eleitores`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chavePublica,
                cpf
            })
        });
        //const data = await response.json();
        return {
            statusCode: response.status,
        } as ApiCall
    }
     catch (error) {
        throw new Error("Could not reach the server.");
    }

}