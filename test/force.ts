import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Force, ForceCaller } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Force', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let force: Force;
  let forceCaller: ForceCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['force', 'forceCaller']);

    const ForceDeployment: Deployment = await deployments.get('Force');
    force = await Promise.resolve(ethers.getContractAt('Force', ForceDeployment.address) as Promise<Force>);

    const ForceCallerDeployment: Deployment = await deployments.get('ForceCaller');
    forceCaller = await Promise.resolve(ethers.getContractAt('ForceCaller', ForceCallerDeployment.address) as Promise<ForceCaller>);
  });


  it('Forces contract to accept ETH', async () => {
    expect(await ethers.provider.getBalance(force.address)).to.equal(ethers.BigNumber.from('0'));
    expect(await ethers.provider.getBalance(forceCaller.address)).to.equal(ethers.utils.parseEther('15'));

    await forceCaller.forceSendEth();

    expect(await ethers.provider.getBalance(forceCaller.address)).to.equal(ethers.BigNumber.from('0'));
    expect(await ethers.provider.getBalance(force.address)).to.equal(ethers.utils.parseEther('15'));
  });

});
