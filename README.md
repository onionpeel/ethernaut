Solutions for Ethernaut challenges

Unfinished:
MagicNum
Need to deploy opcode-based contract to an address

AlienCodex
import '../helpers/Ownable-05.sol';
Is this import part of the challenge?  Does it need to be created?  

Puzzle Wallet
Does not compile.  Produces error:
InternalCompilerError: Assembly exception for bytecode
Error HH600: Compilation failed

These functions cause the error:
    function approveNewAdmin(address _expectedAdmin) external onlyAdmin {
        require(pendingAdmin == _expectedAdmin, "Expected new admin by the current admin is not the pending admin");
        admin = pendingAdmin;
    }

    function upgradeTo(address _newImplementation) external onlyAdmin {
        _upgradeTo(_newImplementation);
    }

  
  
