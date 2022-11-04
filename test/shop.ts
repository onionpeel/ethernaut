import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Shop, ShopBuyer } from '../typechain-types';

// Goal: Claim ownership of the contract below to complete this level.

describe('Shop', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let shop: Shop;
  let shopBuyer: ShopBuyer;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['shop', 'shopBuyer']);

    const ShopDeployment: Deployment = await deployments.get('Shop');
    shop = await Promise.resolve(ethers.getContractAt('Shop', ShopDeployment.address) as Promise<Shop>);

    const ShopBuyerDeployment: Deployment = await deployments.get('ShopBuyer');
    shopBuyer = await Promise.resolve(ethers.getContractAt('ShopBuyer', ShopBuyerDeployment.address) as Promise<ShopBuyer>);
  });


  it('', async () => {
    await shopBuyer.callBuy();
    expect(await shop.isSold()).to.equal(true);
    expect(await shop.price()).to.equal(ethers.BigNumber.from('90'));
  });

});
