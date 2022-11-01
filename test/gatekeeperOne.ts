import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { GatekeeperOne, GatekeeperOneCaller } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('GatekeeperOne', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let gatekeeperOne: GatekeeperOne;
  let gatekeeperOneCaller: GatekeeperOneCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['gatekeeperOne', 'gatekeeperOneCaller']);

    const GatekeeperOneDeployment: Deployment = await deployments.get('GatekeeperOne');
    gatekeeperOne = await Promise.resolve(ethers.getContractAt('GatekeeperOne', GatekeeperOneDeployment.address) as Promise<GatekeeperOne>);

    const GatekeeperOneCallerDeployment: Deployment = await deployments.get('GatekeeperOneCaller');
    gatekeeperOneCaller = await Promise.resolve(ethers.getContractAt('GatekeeperOneCaller', GatekeeperOneCallerDeployment.address) as Promise<GatekeeperOneCaller>);
  });


  // Gate two does not pass.  Has the gas consumption costs changed for function calls in the forks that have happened since this challenge was created?

  it('', async () => {
    await gatekeeperOneCaller.connect(user1).callEnter('0x11111111000079c8');

    expect(await gatekeeperOne.entrant()).to.equal(user1.address);

  });

});
