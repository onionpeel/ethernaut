import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Fallout } from '../typechain-types';

// Goal: Claim ownership of the contract below to complete this level.

describe('Fallout', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let fallout: Fallout;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['fallout']);

    const FalloutDeployment: Deployment = await deployments.get('Fallout');
    fallout = await Promise.resolve(ethers.getContractAt('Fallout', FalloutDeployment.address) as Promise<Fallout>);
  });


  it('Takes ownership of the contract', async () => {
    expect(await fallout.owner()).to.equal(ethers.constants.AddressZero);
    await fallout.connect(user1).Fal1out();
    expect(await fallout.owner()).to.equal(user1.address);
  });

});
