import { Response } from "express";
import { ApiError } from "./ApiError";

export function handleErrors(error:any,response:Response){
    console.error(error)
    if(error instanceof ApiError){
        return response.status(error.statusCode).json({message:error.message})
    }
    return response.status(500).json({message:"Internal Server Error"})
}