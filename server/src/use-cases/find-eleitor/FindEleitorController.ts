import { FindEleitorUseCase } from "./FindEleitorUseCase";
import { Request,Response } from "express"
export default class FindEleitorController{

    constructor(
        private findEleitorUseCase:FindEleitorUseCase
    ){

    }
    
    async handle(req:Request,res:Response):Promise<Response>{
        const id = req.params.cpf
        
        
         try {
            const eleitor = await this.findEleitorUseCase.execute({cpf:id})
            if(!eleitor) return res.status(404).send()
            return res.status(200).json(eleitor)
        } catch (error:any) {
            console.error(error)
            return res.status(404).send()
        } 
    }

}