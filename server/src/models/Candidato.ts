export class Candidato{
    nome:string
    partido:string
    fotoDoCandidatoUrl:string
    numeroDeVotacao:number
    quantidadeDeVotos:number
    indice:number

    constructor(
        nome: string,
        partido: string,
        fotoDoCandidatoUrl: string,
        numeroDeVotacao: number,
        quantidadeDeVotos?: number,
        indice?: number
    ){
        this.nome = nome
        this.partido = partido
        this.fotoDoCandidatoUrl = fotoDoCandidatoUrl
        this.numeroDeVotacao = numeroDeVotacao
        this.quantidadeDeVotos = quantidadeDeVotos?quantidadeDeVotos:0
        this.indice = indice?indice:0
    }
   
    

}
/* 

struct Candidato {
    string nome;
    string partido;
    string fotoDoCandidatoUrl;
    uint16 numeroDeVotacao;
    uint256 quantidadeDeVotos;
    uint256 indice;
} */