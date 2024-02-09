import connectDB from "../../database/connect";
import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../IEleitorRepository";
const COLLECTION_NAME = "eleitores"
export default class EleitorRepositoryMongoDB implements IEleitorRepository{
    entrarEmEleicao(anoDeEleicao: number, eleitor: Eleitor): Promise<string | null> {
        throw new Error("Method not implemented.");
    }
    votar(anoDeEleicao: number, numeroDoCandidato: string, assinatura: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    


    async find(filters: { filterKey: string; filterValue: string; }[]): Promise<Eleitor | null> {
        const db = await connectDB()
        
         const queryFilter = filters.map((filter)=>{ 
            return {[filter.filterKey]:filter.filterValue}
        })
        
        const eleitor = await db.collection(COLLECTION_NAME).findOne({"$or":[...queryFilter]})
        
        if(!eleitor){
            return null
        }
        return new Eleitor({chavePublica:eleitor.chavePublica,cpf:eleitor.cpf},eleitor.id)
    }
    async findByChavePublica(chavePublica: string): Promise<Eleitor | null> {
        const db = await connectDB()
        console.log(`chavePublica: ${chavePublica}`)
        const eleitor = await db.collection(COLLECTION_NAME).findOne({chavePublica:chavePublica}) 
        console.log({eleitor})
        
        if(!eleitor){
           return null
        }
        return new Eleitor({chavePublica:eleitor.chavePublica,cpf:eleitor.cpf},eleitor.id)
    }
    update(id:string,eleitor: Eleitor): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(cpf: string): Promise<boolean> {
        const db = await connectDB()
        const reponse = await db.collection(COLLECTION_NAME).deleteOne({cpf})
        return reponse.deletedCount === 1  
    }
    async findByCpf(cpf: string): Promise<Eleitor | null> {
        const db = await connectDB()
        const eleitor = await db.collection(COLLECTION_NAME).findOne({cpf}) 
        if(!eleitor){
            return null
        }
        return new Eleitor({chavePublica:eleitor.chavePublica,cpf:eleitor.cpf},eleitor.id)
    }
    async save(eleitor: Eleitor): Promise<void> {
        const db = await connectDB()
        
        await db.collection(COLLECTION_NAME).insertOne(eleitor)

    }
    
}