// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';

contract DenialRevert {
  function receive() external {
    assembly {
      revert(0, 0)
    }
  } 
}