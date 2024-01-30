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
    /**
     * @dev variável que armazena o status da eleição
     */
    EleicaoLib.StatusDaEleicao private _statusDaEleicao =
        EleicaoLib.StatusDaEleicao.NAO_INICIADA;

    /**
     * @dev variável que armazena o resultado da eleição
     */
    EleicaoLib.Votos private _resultado;
    /**
     * @dev variável que armazena as informações de votos
     */
    EleicaoLib.Votos private _informacoesDeVotos;
    /**
     * @dev Lista de números de votação cadastrados
     */
    uint16[] public listaDeNumerosCadastrados;

    //bool public eleicaoAtiva;
    //bool public eleicaoEncerrada;
    /**
     * @notice Endereço do administrador do contrato
     */
    address public immutable admin;
    /**
     * @notice Data limite para votar
     */
    uint256 public dataLimiteParaVotar;
    /**
     * @notice Tempo de duração da eleição
     */
    uint256 public constant TEMPO_DE_VOTACAO = 1 days;
    uint256 public constant NUMERO_PARA_VOTO_BRANCO = 777;
    /**
     * @notice Mapeamento de candidatos por número de votação
     */
    mapping(uint16 numeroDeVotacao => EleicaoLib.Candidato informacoes)
        private _candidatoPorNumero;
    /**
     * 
     * @dev Modificador que permite que apenas o administrador execute a função
     */
    modifier somenteAdmnistrador() {
        if (msg.sender != admin) revert Eleicao__SomenteAdministrador();
        _;
    }
    /**
     * 
     * @dev Modificador que permite que a função seja executada apenas antes da eleição
     */
    modifier somenteAntesDaEleicao() {
        if (_statusDaEleicao != EleicaoLib.StatusDaEleicao.NAO_INICIADA)
            revert Eleicao__SomenteAntesDaEleicao();
        _;
    }
    /**
     * 
     * @dev Modificador que permite que a função seja executada apenas durante a eleição
     */
    modifier somenteDuranteAEleicao() {
        if (_statusDaEleicao != EleicaoLib.StatusDaEleicao.ATIVA)
            revert Eleicao__EleicaoNaoEstaAtiva();
        _;
    }
    /**
     * 
     * @dev Modificador que permite que a função seja executada apenas dentro do prazo para votação
     */
    modifier somenteDentroDoPrazoParaVotacao() {
        if (block.timestamp > dataLimiteParaVotar)
            revert Eleicao__PrazoParaVotacaoEncerrado();
        _;
    }
    /**
     * 
     * @param candidatosIniciais Lista de candidatos iniciais a serem cadastrados
     */
    constructor(EleicaoLib.Candidato[] memory candidatosIniciais) {
        _cadastrarCandidatos(candidatosIniciais);
        admin = msg.sender;
    }

    /**
     * @inheritdoc IEleicao
     */
    function iniciarEleicao() public somenteAdmnistrador somenteAntesDaEleicao {
        _statusDaEleicao = EleicaoLib.StatusDaEleicao.ATIVA;
        dataLimiteParaVotar = block.timestamp + TEMPO_DE_VOTACAO;
    }

    /**
     * @inheritdoc IEleicao
     */
    function encerrarEleicao()
        public
        virtual
        somenteAdmnistrador
        somenteDuranteAEleicao
    {
        _statusDaEleicao = EleicaoLib.StatusDaEleicao.ENCERRADA;
        _resultado = _informacoesDeVotos;
        //for (uint i = 0; i < _getVencedorOuEmpatados().length; i++) {
        // resultado.vencedores.push(_getVencedorOuEmpatados()[i]);

        //  }
    }

    /**
     *
     * @inheritdoc IEleicao
     */
    function cadastrarCandidato(
        EleicaoLib.Candidato memory candidato
    ) public somenteAdmnistrador somenteAntesDaEleicao {
        _cadastrarCandidato(candidato);
    }

    /**
     *
     * @inheritdoc IEleicao
     */
    function deletarCandidato(uint16 numeroDoCandidato) public {
        _deletarCandidato(numeroDoCandidato);
    }

    /**
     *
     * @inheritdoc IEleicao
     */
    function votar(
        uint16 numeroDoCandidato
    ) public somenteAdmnistrador somenteDuranteAEleicao {
        if (!_candidatoExiste(numeroDoCandidato)) {
            if (numeroDoCandidato == NUMERO_PARA_VOTO_BRANCO) {
                _informacoesDeVotos.quantidadeDeVotosBrancos++;
            } else {
                _informacoesDeVotos.quantidadeDeVotosNulos++;
            }
        } else {
            _candidatoPorNumero[numeroDoCandidato].quantidadeDeVotos++;
            _informacoesDeVotos.quantidadeDeVotosValidos++;
        }
        _informacoesDeVotos.quantidadeDeVotos++;
    }

    /**
     *
     * @inheritdoc IEleicao
     */
    function getQuantidadeDeCandidatos() public view returns (uint256) {
        return listaDeNumerosCadastrados.length;
    }

    /**
     *
     * @inheritdoc IEleicao
     */
    function getCandidatos(
        uint256 indiceDePartida,
        uint256 quantidade
    ) public view returns (EleicaoLib.Candidato[] memory) {
        uint256 length = quantidade;
        if (length > listaDeNumerosCadastrados.length - indiceDePartida) {
            length = listaDeNumerosCadastrados.length - indiceDePartida;
        }
        EleicaoLib.Candidato[] memory candidatos = new EleicaoLib.Candidato[](
            length
        );
        for (uint i = 0; i < length; i++) {
            candidatos[i] = _candidatoPorNumero[
                listaDeNumerosCadastrados[indiceDePartida + i]
            ];
        }
        return candidatos;
    }
    /**
     * @notice Cadastra uma lista de candidatos na eleição
     * @param candidatos Lista de candidatos a serem cadastrados
     */
    function _cadastrarCandidatos(
        EleicaoLib.Candidato[] memory candidatos
    ) private {
        for (uint i = 0; i < candidatos.length; i++) {
            _cadastrarCandidato(candidatos[i]);
        }
    }
    /**
     * @notice Cadastra um único candidato na eleição
     * @param candidato Informações do candidato a ser cadastrado
     */
    function _cadastrarCandidato(
        EleicaoLib.Candidato memory candidato
    ) private {
        uint16 numeroDoCandidato = candidato.numeroDeVotacao;
        if (_candidatoExiste(numeroDoCandidato))
            revert Eleicao__CandidatoJaExiste();
        _validaVotosZerados(candidato);
        listaDeNumerosCadastrados.push(numeroDoCandidato);
        candidato.indice = listaDeNumerosCadastrados.length - 1;
        _candidatoPorNumero[numeroDoCandidato] = candidato;
    }
    /**
     * @notice Verifica se o candidato existe
     * @param numeroDoCandidato Número de votação do candidato
     */
    function _candidatoExiste(
        uint16 numeroDoCandidato
    ) private view returns (bool) {
        return _candidatoPorNumero[numeroDoCandidato].numeroDeVotacao > 0;
    }

    /**
     * @notice Verifica se a quantidade de votos do candidato é zero
     * @param candidato Informações do candidato
     */
    function _validaVotosZerados(
        EleicaoLib.Candidato memory candidato
    ) private pure {
        if (candidato.quantidadeDeVotos != 0) {
            revert Eleicao__VotosNaoZerados();
        }
    }
    /**
     * @notice Deleta um candidato da eleição
     * @param numeroDoCandidato Número de votação do candidato a ser deletado
     */
    function _deletarCandidato(uint16 numeroDoCandidato) private {
        if (!_candidatoExiste(numeroDoCandidato))
            revert Eleicao__CandidatoNaoExiste();
        uint256 indiceDeletado = _candidatoPorNumero[numeroDoCandidato].indice;
        uint256 indiceUltimoCandidato = listaDeNumerosCadastrados.length - 1;
        listaDeNumerosCadastrados[indiceDeletado] = listaDeNumerosCadastrados[
            indiceUltimoCandidato
        ];
        _candidatoPorNumero[listaDeNumerosCadastrados[indiceUltimoCandidato]]
            .indice = indiceDeletado;
        listaDeNumerosCadastrados.pop();
        delete _candidatoPorNumero[numeroDoCandidato];
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

    /**
     * @inheritdoc IEleicao
     */
    function statusDaEleicao()
        external
        view
        override
        returns (EleicaoLib.StatusDaEleicao)
    {
        return _statusDaEleicao;
    }

    /**
     * @inheritdoc IEleicao
     */
    function resultado()
        external
        view
        override
        returns (EleicaoLib.Votos memory)
    {
        return _resultado;
    }

    /**
     * 
     * @inheritdoc IEleicao
     */
    function candidatoPorNumero(
        uint16 numeroDeVotacao
    ) external view override returns (EleicaoLib.Candidato memory) {
        return _candidatoPorNumero[numeroDeVotacao];
    }
}
