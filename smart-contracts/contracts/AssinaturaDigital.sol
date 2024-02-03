// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

/**
 * @title AssinaturaDigital
 * @author Mateus Navarro
 * @notice Contrato que implementa a assinatura digital de uma mensagem tipada para ser usada na Eleição
 */
abstract contract AssinaturaDigital is EIP712, Nonces {
    /**
     * @dev Erro que indica que a assinatura está fora do prazo
     */
    error AssinaturaDigital__ForaDoPrazo();
    /**
     * @dev Erro que indica que a assinatura é inválida
     */
    error AssinaturaDigital__AssinanteInvalido();
    /**
     * @dev Constante da hash dos parametros da votação com seus tipos
     */
    bytes32 private constant VOTACAO_TYPEHASH =
        keccak256(
            "Votacao(address assinante,uint16 numeroDoCandidato,uint256 anoDaEleicao,uint256 nonce,uint256 prazo)"
        );

    /**
     * @notice Inicializa um contrato com um Domain Separator
     * @param name Nome do Domain Separator
     */
    constructor(string memory name) EIP712(name, "1") {}

    /**
     * @notice Função que assina uma mensagem tipada e incrementa o nonce do assinante
     * @param assinante  Assinante da mensagem
     * @param numeroDoCandidato Número do candidato
     * @param anoDaEleicao Ano da eleição
     * @param prazo Prazo para a assinatura
     * @param v v
     * @param r r
     * @param s s
     */
    function _assinar(
        address assinante,
        uint16 numeroDoCandidato,
        uint256 anoDaEleicao,
        uint256 prazo,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) internal virtual {
        if (block.timestamp > prazo) revert AssinaturaDigital__ForaDoPrazo();
        bytes32 structHash = keccak256(
            abi.encode(
                VOTACAO_TYPEHASH,
                assinante,
                numeroDoCandidato,
                anoDaEleicao,
                _useNonce(assinante),
                prazo
            )
        );
        bytes32 hash = _hashTypedDataV4(structHash);
        address assinanteRecuperado = ECDSA.recover(hash, v, r, s);
        if (assinanteRecuperado != assinante)
            revert AssinaturaDigital__AssinanteInvalido();
    }
}
