import {MongoClient,Db} from "mongodb";

let singleton:Db
export default async function connectDB(){
    if(singleton) return singleton;
    const client = new MongoClient("mongodb://localhost:27017");
    await client.connect();
    singleton = client.db("sistema-eleitoral");
    return singleton;
}