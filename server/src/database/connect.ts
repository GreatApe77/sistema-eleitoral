import {MongoClient,Db} from "mongodb";
import { environment } from "../config/environment";

let singleton:Db
export default async function connectDB(){
    if(singleton) return singleton;
    const client = new MongoClient(environment.MONGO_URI);
    await client.connect();
    singleton = client.db("sistema-eleitoral");
    console.log("Connected to database");
    return singleton;
}