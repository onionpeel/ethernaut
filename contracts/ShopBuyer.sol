// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "./Shop.sol";

contract ShopBuyer {
  Shop shop;

  constructor(Shop _shop) public {
    shop = _shop;
  }

  function callBuy() external {
    shop.buy();
  }

  function price() external view returns (uint _price) {
    if (!shop.isSold()) {
      _price = 100;
    } else {
      _price = 90;
    }
  }
}