import connectDB from "../../database/connect";
import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../IEleitorRepository";
import { IEleitor } from "../../models/interfaces/IEleitor";
export default class EleitorRepositoryMongoDB implements IEleitorRepository{
    private static COLLECTION_NAME="eleitores"
    
    async find(filters: { filterKey: string; filterValue: string; }[]): Promise<IEleitor | null> {
        const db = await connectDB()
        
         const queryFilter = filters.map((filter)=>{ 
            return {[filter.filterKey]:filter.filterValue}
        })
        
        const eleitor = await db.collection<IEleitor>(EleitorRepositoryMongoDB.COLLECTION_NAME).findOne({"$or":[...queryFilter]},{projection:{_id:0}})
        
        
        return eleitor
    }
    async findByChavePublica(chavePublica: string): Promise<IEleitor | null> {
        const db = await connectDB()
        //console.log(`chavePublica: ${chavePublica}`)
        const eleitor = await db.collection<IEleitor>(EleitorRepositoryMongoDB.COLLECTION_NAME).findOne({chavePublica:chavePublica},{projection:{_id:0}}) 
        //console.log({eleitor})
        
        return eleitor
    }
    update(id:string,eleitor: Eleitor): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async delete(cpf: string): Promise<boolean> {
       
            
            const db = await connectDB()
            const reponse = await db.collection<IEleitor>(EleitorRepositoryMongoDB.COLLECTION_NAME).deleteOne({cpf})
            return reponse.deletedCount === 1  
        
    }
    async findByCpf(cpf: string): Promise<IEleitor | null> {
        const db = await connectDB()
        const eleitor = await db.collection<IEleitor>(EleitorRepositoryMongoDB.COLLECTION_NAME).findOne({cpf},{projection:{_id:0}}) 
        return eleitor
        //return new Eleitor({chavePublica:eleitor.chavePublica,cpf:eleitor.cpf},eleitor.id)
    }
    async save(eleitor: IEleitor): Promise<void> {
        const db = await connectDB()
        
        await db.collection<IEleitor>(EleitorRepositoryMongoDB.COLLECTION_NAME).insertOne(eleitor)

    }
    
}