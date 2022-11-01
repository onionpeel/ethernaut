import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { GatekeeperTwo, GatekeeperTwoCaller } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('GatekeeperTwo', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let gatekeeperTwo: GatekeeperTwo;
  let gatekeeperTwoCaller: GatekeeperTwoCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['gatekeeperTwo', 'gatekeeperTwoCaller']);

    const GatekeeperTwoDeployment: Deployment = await deployments.get('GatekeeperTwo');
    gatekeeperTwo = await Promise.resolve(ethers.getContractAt('GatekeeperTwo', GatekeeperTwoDeployment.address) as Promise<GatekeeperTwo>);

    const GatekeeperTwoCallerDeployment: Deployment = await deployments.get('GatekeeperTwoCaller');
    gatekeeperTwoCaller = await Promise.resolve(ethers.getContractAt('GatekeeperTwoCaller', GatekeeperTwoCallerDeployment.address) as Promise<GatekeeperTwoCaller>);
  });

  /**The gateKey is found by getting this value:
   * uint64(bytes8(keccak256(abi.encodePacked(msg.sender)))) ^ uint64(0xffffffffffffffff)
   * 
   * The gateKey is what allows the XOR to return the max uin64 value => uint64(0) - 1), when overflow is allowed.
   */


  it('', async () => {
    expect(await gatekeeperTwo.entrant()).to.equal(deployer.address);
  });

});
