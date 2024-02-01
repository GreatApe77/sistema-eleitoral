// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

abstract contract AssinaturaDigital is EIP712, Nonces {
    error AssinaturaDigital__ForaDoPrazo();
    error AssinaturaDigital__AssinanteInvalido();
    bytes32 private constant VOTACAO_TYPEHASH = keccak256("Votacao(address assinante,uint16 numeroDoCandidato,uint256 anoDaEleicao,uint256 nonce,uint256 prazo)");

    constructor(string memory name) EIP712(name, "1") {}
    
    function _assinar(address assinante,uint16 numeroDoCandidato,uint256 anoDaEleicao,uint256 prazo ,uint8 v,bytes32 r,bytes32 s) internal virtual{
        if(block.timestamp > prazo) revert AssinaturaDigital__ForaDoPrazo();
        bytes32 structHash = keccak256(abi.encode(VOTACAO_TYPEHASH,assinante,numeroDoCandidato,anoDaEleicao,_useNonce(assinante),prazo));
        bytes32 hash = _hashTypedDataV4(structHash);
        address assinanteRecuperado = ECDSA.recover(hash,v,r,s);
        if(assinanteRecuperado != assinante) revert AssinaturaDigital__AssinanteInvalido();
    }
}