// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {EleicaoLib} from  "./lib/EleicaoLib.sol";
interface IEleicao {
    //ERROS
    /**
     * @dev Erro que indica votos não zerados
     */
    error Eleicao__VotosNaoZerados();
    /**
     * @dev Erro que indica que o candidato já existe
     */
    error Eleicao__CandidatoJaExiste();
    /**
     * @dev Erro que indica Eleição inativa
     */
    error Eleicao__EleicaoNaoEstaAtiva();
    /**
     * @dev Erro disparado quando a eleição já foi iniciada
     */
    error Eleicao__SomenteAntesDaEleicao();
    /**
     * @dev Erro disparado quando o caller não é o administrador
     */
    error Eleicao__SomenteAdministrador();
    /**
     * @dev Erro disparado quando o prazo para votação já foi encerrado
     */
    error Eleicao__PrazoParaVotacaoEncerrado();
    /**
     * @dev Erro disparado quando o candidato não existe
     */
    error Eleicao__CandidatoNaoExiste();
    /**
     * @dev Erro disparado quando o eleitor não está aprovado para votar
     */
    error Eleicao__EleitorNaoAprovado();
    //Funções de leitura
    //EVENTOS
    /**
     * @notice Evento disparado quando um candidato é cadastrado
     * @param numeroDeVotacao Número de votação do candidato
     */
    event CandidatoCadastrado(uint16 indexed numeroDeVotacao);
    /**
     * @notice Evento disparado quando um candidato é deletado
     * @param numeroDeVotacao Número de votação do candidato
     */
    event CandidatoDeletado(uint16 indexed numeroDeVotacao);
    /**
     * @notice Evento disparado quando um voto é computado
     */
    event VotoComputado();
    /**
     * @notice Evento disparado quando a eleição é iniciada
     */
    event EleicaoIniciada();
    /**
     * @notice Evento disparado quando a eleição é encerrada
     */
    event EleicaoEncerrada();

    /**
     * @notice Retorna o status da eleição
     * @return Status da eleição (Não iniciada, Ativa, Encerrada)
     */
    function statusDaEleicao() external view returns (EleicaoLib.StatusDaEleicao);
    /**
     * @notice Retorna o resultado da eleição
     * @return Resultado da eleição
     */
    function resultado() external view returns (EleicaoLib.Votos memory);
    /**
     * @notice Retorna as informações do candidato
     * @param numeroDeVotacao Número de votação do candidato
     */
    function candidatoPorNumero(uint16 numeroDeVotacao) external view returns (EleicaoLib.Candidato memory);
    /**
     * @notice Retorna a quantidade de candidatos cadastrados na eleição
     * @return Quantidade de candidatos cadastrados
     */
    function getQuantidadeDeCandidatos() external view returns (uint256);
    /**
     * @notice Retorna os candidatos cadastrados na eleição
     * @param indiceDePartida Índice de partida para a busca
     * @param quantidade Quantidade de candidatos a serem retornados
     * @return Lista de candidatos
     */
    function getCandidatos(uint256 indiceDePartida, uint256 quantidade) external view returns (EleicaoLib.Candidato[] memory);

    //Funções de escrita
    /**
     * @notice Inicia a eleição
     */
    function iniciarEleicao() external;
    /**
     * @notice Encerra a eleição
     */
    function encerrarEleicao() external;
    /**
     * @notice Cadastra um candidato na eleição
     * @param candidato Informações do candidato
     * @dev deve vir com certas informaçoes zeradas ex: quantidadeDeVotos
     */
    function cadastrarCandidato(EleicaoLib.Candidato memory candidato) external;
    /**
     * @notice Deleta um candidato da eleição
     * @param numeroDoCandidato Número de votação do candidato
     */
    function deletarCandidato(uint16 numeroDoCandidato) external;
    /**
     * @notice Vota em um candidato
     * @param numeroDoCandidato Número de votação do candidato
     */
    function votar(uint16 numeroDoCandidato,address eleitor) external;

    /**
     * @notice Aprova eleitores para a eleição
     * @param eleitores endereco dos eleitores a serem aprovados
     */
    function aprovarEleitores(address[] memory eleitores) external;
    /**
     * @notice Retira a aprovação de eleitores para a eleição
     * @param eleitores endereco dos eleitores a serem desaprovados
     */
    function retiraAprovacaoDeEleitores(address[] memory eleitores) external;
    /**
     * @notice Retorna a quantidade de eleitores aprovados para a eleição
     * @return Quantidade de eleitores aprovados
     */
    function getQuantidadeDeEleitores() external view returns (uint256);
    function getPermissaoDeVoto(address eleitor) external view returns (bool);
    
}
