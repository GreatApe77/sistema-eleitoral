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
}
