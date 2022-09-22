// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;
 
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNFT is ERC721 {
    uint256 public totalMints;

    constructor(uint256 _totalMints) ERC721("BasicNFT", "BNFT") {
        totalMints = _totalMints;
    }
}
