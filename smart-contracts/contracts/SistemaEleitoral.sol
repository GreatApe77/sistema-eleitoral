// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {Eleicao} from "./Eleicao.sol";
import {EleicaoLib} from "./lib/EleicaoLib.sol";
/**
 * @title Sistema Eleitoral
 * @author Mateus Navarro
 * @notice Contrato para gerenciar Múltiplas Eleições
 */
contract SistemaEleitoral is Ownable {
    /**
     * @dev Mapping que armazena as eleições usando o ano como chave. ex: 2022 => Eleicao
     */
    mapping(uint256 => Eleicao) private _eleicoes;

    constructor() Ownable(_msgSender()){

    }
    /**
     * @notice Função para criar uma Eleição
     * @param anoDeEleicao O ano da eleição a ser criada
     * @param candidatosIniciais Os candidatos iniciais da eleição podem ser criados no futuro tambem
     * @dev O ano da eleição é usado como chave para o mapping de eleições
     * @dev O numero de votos iniciais deve ser igual a ZERO
     */
    function criarEleicao(uint256 anoDeEleicao,EleicaoLib.Candidato[] memory candidatosIniciais) public onlyOwner {
        _eleicoes[anoDeEleicao] = new Eleicao(candidatosIniciais);
    }
}
