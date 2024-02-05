import { FindEleitorUseCase } from "./FindEleitorUseCase";
import { Request,Response } from "express"
export default class FindEleitorController{

    constructor(
        private findEleitorUseCase:FindEleitorUseCase
    ){

    }
    
    async handle(req:Request,res:Response):Promise<Response>{
        const filter = req.params.filter
        const value = req.params.value
        
         try {
            const eleitor = await this.findEleitorUseCase.execute({filter,value})
            if(!eleitor) return res.status(404).send()
            return res.status(200).json(eleitor)
        } catch (error:any) {
            console.error(error)
            return res.status(404).send()
        } 
    }

}