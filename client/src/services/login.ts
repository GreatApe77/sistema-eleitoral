import { SERVER_URL } from "../constants/SERVER_URL";
import { ApiCall } from "../types/ApiCall";

export async function login(chavePublica: string, signature: string,timestampInMs:number) {
    const response = await fetch(`${SERVER_URL}/eleitores/login`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ chavePublica, signature,timestampInMs }),
    });
    const data = await response.json();
    
    return {
        statusCode: response.status,
        data,
    } as ApiCall
    
  
}