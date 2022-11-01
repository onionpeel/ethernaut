// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

import "./GatekeeperOne.sol";

contract GatekeeperOneCaller {
  using SafeMath for uint256;

  GatekeeperOne gatekeeperOne;

  constructor(GatekeeperOne _gatekeeperOne) public {
    gatekeeperOne = _gatekeeperOne;
  }

  function callEnter(bytes8 _gateKey) external {
    uint256 burn = 1000000;

    gatekeeperOne.enter(_gateKey);
  }
}