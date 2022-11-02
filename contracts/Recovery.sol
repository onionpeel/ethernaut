// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import '@openzeppelin/contracts/math/SafeMath.sol';
import "./SimpleToken.sol";

contract Recovery {
  address public destinationAddress;

  //generate tokens
  function generateToken(string memory _name, uint256 _initialSupply) public {
    new SimpleToken(_name, msg.sender, _initialSupply);
  }

  // Adapted from Openzeppelin Clones library
  function clone(address implementation) external returns (address instance) {
      /// @solidity memory-safe-assembly
      assembly {
          // Cleans the upper 96 bits of the `implementation` word, then packs the first 3 bytes
          // of the `implementation` address with the bytecode before the address.
          mstore(0x00, or(shr(0xe8, shl(0x60, implementation)), 0x3d602d80600a3d3981f3363d3d373d3d3d363d73000000))
          // Packs the remaining 17 bytes of `implementation` with the bytecode after the address.
          mstore(0x20, or(shl(0x78, implementation), 0x5af43d82803e903d91602b57fd5bf3))
          instance := create(0, 0x09, 0x37)
      }
      require(instance != address(0), "ERC1167: create failed");
      destinationAddress = instance;
  }

}

// contract SimpleToken {

//   using SafeMath for uint256;
//   // public variables
//   string public name;
//   mapping (address => uint) public balances;

//   // constructor
//   constructor(string memory _name, address _creator, uint256 _initialSupply) public {
//     name = _name;
//     balances[_creator] = _initialSupply;
//   }

//   // collect ether in return for tokens
//   receive() external payable {
//     balances[msg.sender] = msg.value.mul(10);
//   }

//   // allow transfers of tokens
//   function transfer(address _to, uint _amount) public { 
//     require(balances[msg.sender] >= _amount);
//     balances[msg.sender] = balances[msg.sender].sub(_amount);
//     balances[_to] = _amount;
//   }

//   // clean up after ourselves
//   function destroy(address payable _to) public {
//     selfdestruct(_to);
//   }
// }