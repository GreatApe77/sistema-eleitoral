// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Eleicao {
    /**
     * @dev Informações de um candidato
     */
    struct Candidato {
        string nome;
        string partido;
        string fotoDoCandidatoUrl;
        uint256 quantidadeDeVotos;
        uint16 numeroDeVotacao;
    }
    mapping(uint16 numeroDeVotacao => Candidato informacoes)
        public candidatoPorNumero;
    uint16[] public listaDeNumerosCadastrados;

    constructor(Candidato[] memory candidatosIniciais) {
        _cadastrarCandidatos(candidatosIniciais);
    }

    /**
     *
     * @param candidatos Candidatos a serem cadastrados;
     */
    function _cadastrarCandidatos(Candidato[] memory candidatos) private {
        for (uint i = 0; i < candidatos.length; i++) {
            uint16 numeroDoCandidato = candidatos[i].numeroDeVotacao;
            candidatoPorNumero[numeroDoCandidato] = candidatos[i];
            listaDeNumerosCadastrados.push(numeroDoCandidato);
        }
    }
    function getCandidatos(uint256 indiceDePartida,uint256 indiceDeChegada) public view returns(Candidato[] memory){
        //to do: concluir essa funcao
        uint256 tamanhoDaPagina = (indiceDeChegada - indiceDePartida)+ 1;
        Candidato[] memory candidatos = new Candidato[](tamanhoDaPagina);
        for (uint256 i = indiceDePartida; i < tamanhoDaPagina; i++) {
            candidatos[i] = candidatoPorNumero[listaDeNumerosCadastrados[i]];
        }
        return candidatos;
    }
}
