// SPDX-License-Identifier: MIT

pragma solidity 0.7.0;

import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/proxy/Initializable.sol";
import "hardhat/console.sol";

contract EngineBad is Initializable {
    address public upgrader;
    uint256 public horsePower;

    function initialize() external  {
        console.log("BAD ENGINE BEFORE");

        upgrader = address(0x0);
        horsePower = 0;

        selfdestruct(address(0x0));

        console.log("BAD ENGINE AFTER");
    }
}
