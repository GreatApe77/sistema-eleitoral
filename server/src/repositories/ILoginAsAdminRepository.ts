
export interface ILoginAsAdminRepository{
    login(ultraSecretPassword:string):Promise<string| null>
}