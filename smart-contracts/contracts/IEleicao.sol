// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {EleicaoLib} from  "./lib/EleicaoLib.sol";
interface IEleicao {
    error Eleicao__VotosNaoZerados();
    error Eleicao__CandidatoJaExiste();
    error Eleicao__EleicaoNaoEstaAtiva();
    error Eleicao__SomenteAntesDaEleicao();
    error Eleicao__SomenteAdministrador();
    error Eleicao__PrazoParaVotacaoEncerrado();

    // View Functions
    function statusDaEleicao() external view returns (EleicaoLib.StatusDaEleicao);
    function resultado() external view returns (EleicaoLib.Votos memory);
    function candidatoPorNumero(uint16 numeroDeVotacao) external view returns (EleicaoLib.Candidato memory);
    function getQuantidadeDeCandidatos() external view returns (uint256);
    function getCandidatos(uint256 indiceDePartida, uint256 quantidade) external view returns (EleicaoLib.Candidato[] memory);

    // Restricted Functions
    function iniciarEleicao() external;
    function encerrarEleicao() external;
    function cadastrarCandidato(EleicaoLib.Candidato memory candidato) external;
    function deletarCandidato(uint16 numeroDoCandidato) external;
    function votar(uint16 numeroDoCandidato) external;

    
}
