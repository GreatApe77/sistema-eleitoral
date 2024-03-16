export interface IAdminAuthService{
    //login(ultraSecretPassword:string):Promise<string>
    generateToken():string
    validatePassword(ultraSecretPassword:string):boolean
    
}