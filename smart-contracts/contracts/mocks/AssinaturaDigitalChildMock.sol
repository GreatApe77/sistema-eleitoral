// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AssinaturaDigital} from "../AssinaturaDigital.sol";

contract AssinaturaDigitalChildMock is AssinaturaDigital{

    constructor(string memory name) AssinaturaDigital(name) {
        
    }
}