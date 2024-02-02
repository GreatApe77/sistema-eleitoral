export default class Eleitor {
    chavePublica: string;
    cpf: string;

    constructor(chavePublica: string, cpf: string) {
        this.chavePublica = chavePublica;
        this.cpf = cpf;
    }
}