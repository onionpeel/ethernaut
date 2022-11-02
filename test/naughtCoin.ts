import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { NaughtCoin } from '../typechain-types';

// Goal: Claim ownership of the contract below to complete this level.

describe('NaughtCoin', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let naughtCoin: NaughtCoin;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['naughtCoin']);

    const NaughtCoinDeployment: Deployment = await deployments.get('NaughtCoin');
    naughtCoin = await Promise.resolve(ethers.getContractAt('NaughtCoin', NaughtCoinDeployment.address) as Promise<NaughtCoin>);
  });


  it('', async () => {
    await naughtCoin.approve(user1.address, ethers.utils.parseEther('1000000'));
    await naughtCoin.connect(user1).transferFrom(deployer.address, user1.address, ethers.utils.parseEther('1000000'));
    expect(await naughtCoin.balanceOf(deployer.address)).to.equal(ethers.BigNumber.from('0'));
  });

});
