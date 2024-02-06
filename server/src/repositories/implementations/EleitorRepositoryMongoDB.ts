import connectDB from "../../database/connect";
import Eleitor from "../../models/Eleitor";
import { IEleitorRepository } from "../IEleitorRepository";
const COLLECTION_NAME = "eleitores"
//const UNIQUE_INDEX_FIELDS = { cpf: 1, chavePublica: 1 };
export default class EleitorRepositoryMongoDB implements IEleitorRepository{

/*     constructor() {
        this.createUniqueIndex()
        .catch((error)=>{
            console.error(error)
            process.exit(1)
        })
        ; 
    }
 */
    /* private async createUniqueIndex(): Promise<void> {
        const db = await connectDB();
        await db.collection(COLLECTION_NAME).createIndex(UNIQUE_INDEX_FIELDS, { unique: true });
    } */
    async find(filter: string,filterValue:string): Promise<Eleitor | null> {
        const db = await connectDB()
        
        const queryFilter = {[filter]:filterValue}
        const eleitor = await db.collection(COLLECTION_NAME).findOne(queryFilter)
        
        if(!eleitor){
            return null
        }
        return new Eleitor({chavePublica:eleitor.chavePublica,cpf:eleitor.cpf},eleitor.id)
    }
    
    async findByChavePublica(chavePublica: string): Promise<Eleitor | null> {
        const db = await connectDB()
        const eleitor = await db.collection(COLLECTION_NAME).findOne({chavePublica}) 
        if(!eleitor){
           return null
        }
        return new Eleitor({chavePublica:eleitor.chavePublica,cpf:eleitor.cpf},eleitor.id)
    }
    update(id:string,eleitor: Eleitor): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(cpf: string): Promise<void> {
        throw new Error("Method not implemented.");
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