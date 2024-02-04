// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {EleicaoLib} from "./lib/EleicaoLib.sol";
import {IEleicao} from "./IEleicao.sol";
import {AssinaturaDigital} from "./AssinaturaDigital.sol";
/**
 * @title Sistema Eleitoral
 * @author Mateus Navarro
 * @notice Contrato para gerenciar Múltiplas Eleições
 */
contract SistemaEleitoral is Ownable,AssinaturaDigital {
    /**
     * @dev Erro que indica que a eleição já existe
     */
    error SistemaEleitoral__EleicaoJaExiste();
    /**
     * @dev Erro que indica que a eleição não existe
     */
    error SistemaEleitoral__EleicaoNaoExiste();
    /**
     * @dev Mapping que armazena as eleições usando o ano como chave. ex: 2022 => Eleicao
     */
    mapping(uint256 => IEleicao) private _eleicoes;
    /**
     * @notice Evento disparado quando uma eleição é criada
     * @param anoDeEleicao O ano da eleição
     * @param enderecoDaEleicao O endereço da eleição criada
     */
    event EleicaoCriada(
        uint256 indexed anoDeEleicao,
        address indexed enderecoDaEleicao
    );
    /**
     * @notice Modificador que assegura que a eleição não existe
     */
    modifier somenteNovasEleicoes(uint256 anoDeEleicao) {
        if (_eleicaoExiste(anoDeEleicao)) {
            revert SistemaEleitoral__EleicaoJaExiste();
        }
        _;
    }
    /**
     * @notice Modificador que verifica se a eleição existe
     */
    modifier somenteEleicoesExistentes(uint256 anoDeEleicao) {
        if (!_eleicaoExiste(anoDeEleicao)) {
            revert SistemaEleitoral__EleicaoNaoExiste();
        }
        _;
    }

    /**
     * @notice Atribui o cargo de administrador ao criador do contrato
     */
    constructor() Ownable(_msgSender()) AssinaturaDigital("Sistema Eleitoral") {}

    /**
     * @notice Função para criar uma Eleição
     * @param anoDeEleicao O ano da eleição a ser criada
     * @param candidatosIniciais Os candidatos iniciais da eleição podem ser criados no futuro tambem
     * @dev O ano da eleição é usado como chave para o mapping de eleições
     * @dev O numero de votos iniciais deve ser igual a ZERO
     */
    function anexarEleicao(
        uint256 anoDeEleicao,
        address enderecoDaEleicao,
        EleicaoLib.Candidato[] memory candidatosIniciais
    ) public onlyOwner somenteNovasEleicoes(anoDeEleicao) {
        IEleicao eleicaoAnexada = IEleicao(enderecoDaEleicao);
        if(!eleicaoAnexada.supportsInterface(type(IEleicao).interfaceId)) revert SistemaEleitoral__EleicaoNaoExiste();
        if(eleicaoAnexada.ano)
    }

    /**
     * @notice Função para iniciar uma Eleição dada uma chave
     * @param anoDeEleicao O ano da eleição a ser iniciada
     */
    function iniciarEleicao(
        uint256 anoDeEleicao
    ) public onlyOwner somenteEleicoesExistentes(anoDeEleicao) {
        eleicao(anoDeEleicao).iniciarEleicao();
    }

    /**
     * @notice Função para encerrar uma Eleição dada uma chave
     * @param anoDeEleicao O ano da eleição a ser encerrada
     */
    function encerrarEleicao(
        uint256 anoDeEleicao
    ) public onlyOwner somenteEleicoesExistentes(anoDeEleicao) {
        _eleicoes[anoDeEleicao].encerrarEleicao();
    }

    /**
     * @notice Função para cadastrar um candidato em uma Eleição dada uma chave
     * @param anoDeEleicao O ano da eleição a ser cadastrada
     * @param candidato O candidato a ser cadastrado
     */
    function cadastrarCandidato(
        uint256 anoDeEleicao,
        EleicaoLib.Candidato memory candidato
    ) public onlyOwner {
        eleicao(anoDeEleicao).cadastrarCandidato(candidato);
    }

    /**
     * @notice Função para deletar um candidato de uma Eleição
     * @param anoDeEleicao O ano da eleição a ser deletada
     * @param numeroDoCandidato O número de votação do candidato a ser deletado
     * @param eleitor O endereço do eleitor
     * @param prazo O prazo para a assinatura
     * @param v v
     * @param r r
     * @param s s
     */
    function votar(
        uint256 anoDeEleicao,
        uint16 numeroDoCandidato,
        address eleitor,
        uint256 prazo,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public onlyOwner somenteEleicoesExistentes(anoDeEleicao) {
        
        _assinar(eleitor,numeroDoCandidato,anoDeEleicao,prazo,v,r,s);
        eleicao(anoDeEleicao).votar(numeroDoCandidato,eleitor);
    }

    /**
     * @notice Consulta o resultado de uma eleição
     * @param anoDeEleicao O ano da eleição
     */
    function resultado(
        uint256 anoDeEleicao
    ) public view returns (EleicaoLib.Votos memory) {
        return eleicao(anoDeEleicao).resultado();
    }

    /**
     * @notice Consulta o status de uma eleição
     * @param anoDeEleicao O ano da eleição
     */
    function statusDaEleicao(
        uint256 anoDeEleicao
    ) public view returns (EleicaoLib.StatusDaEleicao) {
        return eleicao(anoDeEleicao).statusDaEleicao();
    }

    /**
     * @notice Consulta as informações de um candidato de uma eleição específica
     * @param anoDeEleicao O ano da eleição
     * @param numeroDeVotacao O número de votação do candidato
     */
    function candidatoPorNumero(
        uint256 anoDeEleicao,
        uint16 numeroDeVotacao
    ) public view returns (EleicaoLib.Candidato memory) {
        return eleicao(anoDeEleicao).candidatoPorNumero(numeroDeVotacao);
    }

    /**
     * @notice Consulta a quantidade de candidatos de uma eleição específica
     * @param anoDeEleicao O ano da eleição
     */
    function getQuantidadeDeCandidatos(
        uint256 anoDeEleicao
    ) public view returns (uint256) {
        return eleicao(anoDeEleicao).getQuantidadeDeCandidatos();
    }

    /**
     * @notice Consulta os candidatos de uma eleição específica
     * @param anoDeEleicao O ano da eleição
     * @param indiceDePartida O índice de partida para a busca
     * @param quantidade A quantidade de candidatos a serem retornados
     */
    function getCandidatos(
        uint256 anoDeEleicao,
        uint256 indiceDePartida,
        uint256 quantidade
    ) public view returns (EleicaoLib.Candidato[] memory) {
        return eleicao(anoDeEleicao).getCandidatos(indiceDePartida, quantidade);
    }

    /**
     * @notice Consulta o endereço de uma eleição específica
     * @param anoDeEleicao O ano da eleição
     */
    function eleicao(uint256 anoDeEleicao) public view returns (IEleicao) {
        return _eleicoes[anoDeEleicao];
    }

    /**
     * @notice Consulta se uma eleição existe
     * @param anoDeEleicao O ano da eleição
     */
    function _eleicaoExiste(uint256 anoDeEleicao) internal view returns (bool) {
        return address(eleicao(anoDeEleicao)) != address(0);
    }
}
