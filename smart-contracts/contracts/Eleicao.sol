// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Eleicao {
    struct Candidato {
        string nome;
        string partido;
        string fotoDoCandidatoUrl;
        uint256 quantidadeDeVotos;
        uint16 numeroDeVotacao;
    }
    mapping(uint16 numeroDeVotacao => Candidato informacoes) public candidatoPorNumero;
    uint16[] public listaDeNumerosCadastrados;
    constructor(Candidato[] memory candidatosIniciais){
        _cadastrarCandidatosIniciais(candidatosIniciais);
    }


    function _cadastrarCandidatosIniciais(Candidato[] memory candidatosIniciais) private{
        for (uint i = 0; i < candidatosIniciais.length; i++) {
            uint16 numeroDoCandidato =candidatosIniciais[i].numeroDeVotacao; 
            candidatoPorNumero[numeroDoCandidato] = candidatosIniciais[i];
            listaDeNumerosCadastrados.push(numeroDoCandidato);
        }
    }
}
