// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import {EleicaoLib} from "./lib/EleicaoLib.sol";
import {IEleicao} from "./IEleicao.sol";
/**
 * @title Eleicao
 * @author Mateus Navarro
 * @notice Contrato para gerenciar uma eleição
 */
contract Eleicao is IEleicao {

    

    EleicaoLib.StatusDaEleicao public statusDaEleicao = EleicaoLib.StatusDaEleicao.NAO_INICIADA;

    EleicaoLib.Votos private _resultado;

    EleicaoLib.Votos private _informacoesDeVotos;

    uint16[] public listaDeNumerosCadastrados;

    //bool public eleicaoAtiva;
    //bool public eleicaoEncerrada;
    address public immutable admin;

    uint256 public dataLimiteParaVotar;
    uint256 public constant TEMPO_DE_VOTACAO = 1 days;

    mapping(uint16 numeroDeVotacao => EleicaoLib.Candidato informacoes)
        public candidatoPorNumero;
    modifier somenteAdmnistrador() {
        if (msg.sender != admin) revert Eleicao__SomenteAdministrador();
        _;
    }
    modifier somenteAntesDaEleicao(){
        if(statusDaEleicao!=EleicaoLib.StatusDaEleicao.NAO_INICIADA) revert Eleicao__SomenteAntesDaEleicao();
        _;
    }
    modifier somenteDuranteAEleicao(){
        if(statusDaEleicao!=EleicaoLib.StatusDaEleicao.ATIVA) revert Eleicao__EleicaoNaoEstaAtiva();
        _;
    }
    modifier somenteDentroDoPrazoParaVotacao(){
        if(block.timestamp>dataLimiteParaVotar) revert Eleicao__PrazoParaVotacaoEncerrado();
        _;
    }
    constructor(EleicaoLib.Candidato[] memory candidatosIniciais) {
        _cadastrarCandidatos(candidatosIniciais);
        admin = msg.sender;
    }

    function iniciarEleicao() public somenteAdmnistrador somenteAntesDaEleicao {
        statusDaEleicao = EleicaoLib.StatusDaEleicao.ATIVA;
        dataLimiteParaVotar = block.timestamp + TEMPO_DE_VOTACAO;
    }

    function encerrarEleicao() public virtual somenteAdmnistrador somenteDuranteAEleicao {
        statusDaEleicao = EleicaoLib.StatusDaEleicao.ENCERRADA;
        _resultado = _informacoesDeVotos;
        //for (uint i = 0; i < _getVencedorOuEmpatados().length; i++) {
        // resultado.vencedores.push(_getVencedorOuEmpatados()[i]);

        //  }
    }

    function cadastrarCandidato(
        EleicaoLib.Candidato memory candidato
    ) public somenteAdmnistrador somenteAntesDaEleicao {
        _cadastrarCandidato(candidato);
    }

    function deletarCandidato(uint16 numeroDoCandidato) public {
        _deletarCandidato(numeroDoCandidato);
    }

    function votar(uint16 numeroDoCandidato) public somenteAdmnistrador somenteDuranteAEleicao {
        
        if (!_candidatoExiste(numeroDoCandidato)) {
            if (numeroDoCandidato == 777) {
                _informacoesDeVotos.quantidadeDeVotosBrancos++;
            } else {
                _informacoesDeVotos.quantidadeDeVotosNulos++;
            }
        } else {
            candidatoPorNumero[numeroDoCandidato].quantidadeDeVotos++;
            _informacoesDeVotos.quantidadeDeVotosValidos++;
        }
        _informacoesDeVotos.quantidadeDeVotos++;
    }

    function getQuantidadeDeCandidatos() public view returns (uint256) {
        return listaDeNumerosCadastrados.length;
    }

    function getCandidatos(
        uint256 indiceDePartida,
        uint256 quantidade
    ) public view returns (EleicaoLib.Candidato[] memory) {
        uint256 length = quantidade;
        if (length > listaDeNumerosCadastrados.length - indiceDePartida) {
            length = listaDeNumerosCadastrados.length - indiceDePartida;
        }
        EleicaoLib.Candidato[] memory candidatos = new EleicaoLib.Candidato[](length);
        for (uint i = 0; i < length; i++) {
            candidatos[i] = candidatoPorNumero[
                listaDeNumerosCadastrados[indiceDePartida + i]
            ];
        }
        return candidatos;
    }


    function _cadastrarCandidatos(EleicaoLib.Candidato[] memory candidatos) private {
        for (uint i = 0; i < candidatos.length; i++) {
            _cadastrarCandidato(candidatos[i]);
        }
    }

    function _cadastrarCandidato(EleicaoLib.Candidato memory candidato) private {
        uint16 numeroDoCandidato = candidato.numeroDeVotacao;
        if (_candidatoExiste(numeroDoCandidato))
            revert Eleicao__CandidatoJaExiste();
        _validaVotosZerados(candidato);
        listaDeNumerosCadastrados.push(numeroDoCandidato);
        candidato.indice = listaDeNumerosCadastrados.length - 1;
        candidatoPorNumero[numeroDoCandidato] = candidato;
    }

    function _candidatoExiste(
        uint16 numeroDoCandidato
    ) private view returns (bool) {
        return candidatoPorNumero[numeroDoCandidato].numeroDeVotacao > 0;
    }

    function _validaVotosZerados(EleicaoLib.Candidato memory candidato) private pure {
        if (candidato.quantidadeDeVotos != 0) {
            revert Eleicao__VotosNaoZerados();
        }
    }

    function _deletarCandidato(uint16 numeroDoCandidato) private {
        uint256 indiceDeletado = candidatoPorNumero[numeroDoCandidato].indice;
        uint256 indiceUltimoCandidato = listaDeNumerosCadastrados.length - 1;
        listaDeNumerosCadastrados[indiceDeletado] = listaDeNumerosCadastrados[
            indiceUltimoCandidato
        ];
        candidatoPorNumero[listaDeNumerosCadastrados[indiceUltimoCandidato]]
            .indice = indiceDeletado;
        listaDeNumerosCadastrados.pop();
        delete candidatoPorNumero[numeroDoCandidato];
    }
        /*  function _getVencedorOuEmpatados() private view returns (Candidato[] memory){
        Candidato memory vencedor;
        uint256 totalDeCandidatos = getQuantidadeDeCandidatos();
        //Candidato[] memory empatados = new Candidato[](totalDeCandidatos);
        for (uint256 i = 0; i < totalDeCandidatos; i++) {
            Candidato memory candidato = candidatoPorNumero[
                listaDeNumerosCadastrados[i]
            ];
            if (candidato.quantidadeDeVotos > vencedor.quantidadeDeVotos) {
                vencedor = candidato;
            }
        }
        uint256 quantidadeDeEmpatados = 0;
        for (uint i = 0; i < totalDeCandidatos; i++) {
            if (candidatoPorNumero[listaDeNumerosCadastrados[i]]
                .quantidadeDeVotos == vencedor.quantidadeDeVotos) {
                quantidadeDeEmpatados++;
            }
        }
        Candidato[] memory vencedores = new Candidato[](quantidadeDeEmpatados);
        for (uint i = 0; i < quantidadeDeEmpatados; i++) {
            vencedores[i] = candidatoPorNumero[listaDeNumerosCadastrados[i]];
        }
        return (vencedores);
       // for (uint i = 0; i < array.length; i++) {
            
        //}
        //resultado.vencedor = vencedor;
        
    } */

    /* function getCandidatos(uint256 indiceDePartida,uint256 indiceDeChegada) public view returns(Candidato[] memory){
        //to do: concluir essa funcao
        if(indiceDePartida>indiceDeChegada) revert();
        uint256 tamanhoDaPagina = (indiceDeChegada - indiceDePartida)+ 1;
        Candidato[] memory candidatos = new Candidato[](tamanhoDaPagina);
        
        for (uint256 i = indiceDePartida; i < indiceDeChegada; i++) {
            candidatos[i] = candidatoPorNumero[listaDeNumerosCadastrados[i]];
        }
        return candidatos;
    } */

    
}