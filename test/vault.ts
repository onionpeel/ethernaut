import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Vault } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Vault', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let vault: Vault;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['vault']);

    const VaultDeployment: Deployment = await deployments.get('Vault');
    vault = await Promise.resolve(ethers.getContractAt('Vault', VaultDeployment.address) as Promise<Vault>);
  });


  it('Forces contract to accept ETH', async () => {
    expect(await vault.locked()).to.equal(true);

    let password = await ethers.provider.getStorageAt(vault.address, 1);
    await vault.unlock(password);

    expect(await vault.locked()).to.equal(false);

  });

});
