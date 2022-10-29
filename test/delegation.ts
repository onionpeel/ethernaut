import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Delegation, Delegate, DelegationCaller } from '../typechain-types';

/** Goal: The goal of this level is for you to claim ownership of the instance you are given. */

describe('Delegation', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let delegation: Delegation;
  let delegate: Delegate;
  let delegationCaller: DelegationCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['delegation', 'delegate', 'delegationCaller']);

    const DelegationDeployment: Deployment = await deployments.get('Delegation');
    delegation = await Promise.resolve(ethers.getContractAt('Delegation', DelegationDeployment.address) as Promise<Delegation>);

    const DelegateDeployment: Deployment = await deployments.get('Delegate');
    delegate = await Promise.resolve(ethers.getContractAt('Delegate', DelegateDeployment.address) as Promise<Delegate>);

    const DelegationCallerDeployment: Deployment = await deployments.get('DelegationCaller');
    delegationCaller = await Promise.resolve(ethers.getContractAt('DelegationCaller', DelegationCallerDeployment.address) as Promise<DelegationCaller>);
  });


  it('Claim ownership', async () => {
    expect(await delegation.owner()).to.equal(deployer.address);

    await delegationCaller.callDelegation();

    expect(await delegation.owner()).to.equal(delegationCaller.address);
  });

});
