// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

contract PreservationLibTwo {
  address public timeZone1Library;
  address public timeZone2Library;
  address public owner; 
  uint storedTime;

  function setTime(uint256 _timeStamp) external {
    owner = tx.origin;
  }
}