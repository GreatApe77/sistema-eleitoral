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
    error SistemaEleitoral__EleicaoJaExiste();
    
    /**
     * @dev Mapping que armazena as eleições usando o ano como chave. ex: 2022 => Eleicao
     */
    mapping(uint256 => Eleicao) private _eleicoes;
    /**
     * @notice Evento disparado quando uma eleição é criada
     * @param anoDeEleicao O ano da eleição
     * @param enderecoDaEleicao O endereço da eleição criada
     */
    event EleicaoCriada(uint256 indexed anoDeEleicao,address indexed enderecoDaEleicao);

    modifier somenteNovasEleicoes(uint256 anoDeEleicao){
        if(_eleicaoExiste(anoDeEleicao)){
            revert SistemaEleitoral__EleicaoJaExiste();
        }
        _;
    }
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
        Eleicao  eleicao = new Eleicao(anoDeEleicao,candidatosIniciais);
        _eleicoes[anoDeEleicao] = eleicao;
        emit EleicaoCriada(anoDeEleicao,address(eleicao));
    }

    function _eleicaoExiste(uint256 anoDeEleicao) internal view returns(bool){
        return address(_eleicoes[anoDeEleicao]) != address(0);
    }
}
