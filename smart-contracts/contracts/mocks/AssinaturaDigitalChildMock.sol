// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AssinaturaDigital} from "../AssinaturaDigital.sol";

contract AssinaturaDigitalChildMock is AssinaturaDigital{

    constructor(string memory name) AssinaturaDigital(name) {
        
    }
    function assinar( 
        address assinante,
        uint16 numeroDoCandidato,
        uint256 prazo,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) public{
        _assinar(
            assinante,
            numeroDoCandidato,
            prazo,
            v,
            r,
            s
        );
    }
}