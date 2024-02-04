
export default class EleitorRepository{
    async create(chavePublica: string, cpf: string){
        return {chavePublica, cpf}
    }
    async findByCpf(cpf: string){
        return {chavePublica: "chavePublica", cpf}
    }
    async findByChavePublica(chavePublica: string){
        return {chavePublica, cpf: "cpf"}
    }
    async update({chavePublica, cpf}: {chavePublica?: string, cpf?: string}){
        return {chavePublica, cpf}
    }
    async delete(cpf: string){
        return {chavePublica: "chavePublica", cpf}
    }
}