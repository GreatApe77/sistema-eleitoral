// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Nonces} from "@openzeppelin/contracts/utils/Nonces.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import {EIP712} from "@openzeppelin/contracts/utils/cryptography/EIP712.sol";

contract AssinaturaDigital is EIP712, Nonces {
    bytes32 private constant VOTACAO_TYPEHASH = keccak256("Votacao(uint16 numeroDoCandidato,uint256 nonce,uint256 prazo,bool votoComputado)");

    constructor(string memory name) EIP712(name, "1") {}
    
}