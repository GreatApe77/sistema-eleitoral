// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;


contract MockContract {


    function supportsInterface(bytes4 interfaceId) external pure returns (bool) {
        return interfaceId== 0x00000000;
    }
}