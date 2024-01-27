// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Eleicao {
    error Eleicao__VotosNaoZerados();
    error Eleicao__CandidatoJaExiste();
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
    
    mapping(uint16 numeroDeVotacao => Candidato informacoes)
        public candidatoPorNumero;
    uint16[] public listaDeNumerosCadastrados;

    constructor(Candidato[] memory candidatosIniciais) {
        _cadastrarCandidatos(candidatosIniciais);
    }

    /**
     *
     * @param candidatos Candidatos a serem cadastrados;
     */
    function _cadastrarCandidatos(Candidato[] memory candidatos) private {
        for (uint i = 0; i < candidatos.length; i++) {
            uint16 numeroDoCandidato = candidatos[i].numeroDeVotacao;
            if(_candidatoExiste(numeroDoCandidato)) revert Eleicao__CandidatoJaExiste();
            _validaVotosZerados(candidatos[i]);

            candidatoPorNumero[numeroDoCandidato] = candidatos[i];
            listaDeNumerosCadastrados.push(numeroDoCandidato);
            candidatos[i].indice = listaDeNumerosCadastrados.length - 1;
        }
    }
    function deletarCandidato(uint16 numeroDoCandidato) public {
        _deletarCandidato(numeroDoCandidato);
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
        listaDeNumerosCadastrados[indiceDeletado] = listaDeNumerosCadastrados[indiceUltimoCandidato];
        listaDeNumerosCadastrados.pop();
        candidatoPorNumero[listaDeNumerosCadastrados[indiceUltimoCandidato]].indice = indiceDeletado;
        
    }
    function getCandidatos(uint256 indiceDePartida,uint256 quantidade) public view returns(Candidato[] memory){
        uint256 length = quantidade;
        if (length > listaDeNumerosCadastrados.length - indiceDePartida) {
            length = listaDeNumerosCadastrados.length - indiceDePartida;
        }
        Candidato[] memory candidatos = new Candidato[](length);
        for (uint i = 0; i <length; i++) {
            candidatos[i] = candidatoPorNumero[listaDeNumerosCadastrados[indiceDePartida+i]];
        }
        return candidatos;
    }
    function _candidatoExiste(uint16 numeroDoCandidato) private view returns(bool){
        return candidatoPorNumero[numeroDoCandidato].numeroDeVotacao > 0;
    }
    function _validaVotosZerados(Candidato memory candidato) private view {
        if(candidato.quantidadeDeVotos !=0){
            revert Eleicao__VotosNaoZerados();
        }
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