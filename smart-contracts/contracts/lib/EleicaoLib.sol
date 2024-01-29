// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

library EleicaoLib {
    enum StatusDaEleicao {
        NAO_INICIADA,
        ATIVA,
        ENCERRADA
    }
    struct Votos {
        uint256 quantidadeDeVotos;
        uint256 quantidadeDeVotosValidos;
        uint256 quantidadeDeVotosBrancos;
        uint256 quantidadeDeVotosNulos;
    }
    struct Candidato {
        string nome;
        string partido;
        string fotoDoCandidatoUrl;
        uint16 numeroDeVotacao;
        uint256 quantidadeDeVotos;
        uint256 indice;
    }
}
