// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Eleicao {
    error Eleicao__VotosNaoZerados();
    error Eleicao__CandidatoJaExiste();
    error Eleicao__EleicaoNaoEstaAtiva();
    error Eleicao__EleicaoEncerrada();

    /**
     * @dev Informações de um candidato
     */
    struct Candidato {
        string nome;
        string partido;
        string fotoDoCandidatoUrl;
        uint16 numeroDeVotacao;
        uint256 quantidadeDeVotos;
        uint256 indice;
    }
    struct Votos {
        uint256 quantidadeDeVotos;
        uint256 quantidadeDeVotosValidos;
        uint256 quantidadeDeVotosBrancos;
        uint256 quantidadeDeVotosNulos;
    }
    struct Resultado {
        Votos informacoesDeVotos;
        Candidato vencedor;
    }

    Resultado public resultado;

    Votos private _informacoesDeVotos;

    uint16[] public listaDeNumerosCadastrados;

    bool public eleicaoAtiva;
    bool public eleicaoEncerrada;

    uint256 public constant TEMPO_DE_VOTACAO = 1 days;

    mapping(uint16 numeroDeVotacao => Candidato informacoes)
        public candidatoPorNumero;

    constructor(Candidato[] memory candidatosIniciais) {
        _cadastrarCandidatos(candidatosIniciais);
    }

    function iniciarEleicao() public {
        eleicaoAtiva = true;
    }

    function encerrarEleicao() public virtual {
        eleicaoAtiva = false;
        eleicaoEncerrada = true;
        resultado.informacoesDeVotos = _informacoesDeVotos;
        _decidirVencedor();
    }

    function _decidirVencedor() private {
        Candidato memory vencedor;
        for (uint256 i = 0; i < listaDeNumerosCadastrados.length; i++) {
            Candidato memory candidato = candidatoPorNumero[
                listaDeNumerosCadastrados[i]
            ];
            if (candidato.quantidadeDeVotos > vencedor.quantidadeDeVotos) {
                vencedor = candidato;
            }
        }
        resultado.vencedor = vencedor;
    }

    function votar(uint16 numeroDoCandidato) public {
        if (!eleicaoAtiva) revert();
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

    /**
     *
     * @param candidatos Candidatos a serem cadastrados;
     */
    function _cadastrarCandidatos(Candidato[] memory candidatos) private {
        for (uint i = 0; i < candidatos.length; i++) {
            _cadastrarCandidato(candidatos[i]);
        }
    }

    function deletarCandidato(uint16 numeroDoCandidato) public {
        _deletarCandidato(numeroDoCandidato);
    }

    function _cadastrarCandidato(Candidato memory candidato) private {
        uint16 numeroDoCandidato = candidato.numeroDeVotacao;
        if (_candidatoExiste(numeroDoCandidato))
            revert Eleicao__CandidatoJaExiste();
        _validaVotosZerados(candidato);
        listaDeNumerosCadastrados.push(numeroDoCandidato);
        candidato.indice = listaDeNumerosCadastrados.length - 1;
        candidatoPorNumero[numeroDoCandidato] = candidato;
    }

    function cadastrarCandidato(Candidato memory candidato) public {
        _cadastrarCandidato(candidato);
    }

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

    function getCandidatos(
        uint256 indiceDePartida,
        uint256 quantidade
    ) public view returns (Candidato[] memory) {
        uint256 length = quantidade;
        if (length > listaDeNumerosCadastrados.length - indiceDePartida) {
            length = listaDeNumerosCadastrados.length - indiceDePartida;
        }
        Candidato[] memory candidatos = new Candidato[](length);
        for (uint i = 0; i < length; i++) {
            candidatos[i] = candidatoPorNumero[
                listaDeNumerosCadastrados[indiceDePartida + i]
            ];
        }
        return candidatos;
    }

    function _candidatoExiste(
        uint16 numeroDoCandidato
    ) private view returns (bool) {
        return candidatoPorNumero[numeroDoCandidato].numeroDeVotacao > 0;
    }

    function _validaVotosZerados(Candidato memory candidato) private pure {
        if (candidato.quantidadeDeVotos != 0) {
            revert Eleicao__VotosNaoZerados();
        }
    }

    function getQuantidadeDeCandidatos() public view returns (uint256) {
        return listaDeNumerosCadastrados.length;
    }
}

/**
 * 
 * 
 * 
 * 
 * pragma solidity ^0.4.22;

contract ArrayPagination {
    bytes32[] arr;

    function add(bytes32 data) public {
        arr.push(data);
    }

    function fetchPage(uint256 cursor, uint256 howMany)
    public
    view
    returns (bytes32[] values, uint256 newCursor)
    {
        uint256 length = howMany;
        if (length > arr.length - cursor) {
            length = arr.length - cursor;
        }

        values = new bytes32[](length);
        for (uint256 i = 0; i < length; i++) {
            values[i] = arr[cursor + i];
        }

        return (values, cursor + length);
    }
}
 */
