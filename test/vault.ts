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
    await vault.unlock('0xb68fe43f0d1a0d7aef123722670be50268e15365401c442f8806ef83b612976b');

    expect(await vault.locked()).to.equal(false);

  });

});
