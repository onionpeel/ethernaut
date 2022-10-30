import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Elevator, BuildingExample } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Elevator', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let elevator: Elevator;
  let buildingExample: BuildingExample;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['elevator', 'buildingExample']);

    const ElevatorDeployment: Deployment = await deployments.get('Elevator');
    elevator = await Promise.resolve(ethers.getContractAt('Elevator', ElevatorDeployment.address) as Promise<Elevator>);

    const BuildingExampleDeployment: Deployment = await deployments.get('BuildingExample');
    buildingExample = await Promise.resolve(ethers.getContractAt('BuildingExample', BuildingExampleDeployment.address) as Promise<BuildingExample>);
  });


  it('', async () => {
    expect(await elevator.top()).to.equal(false);
    expect(await elevator.floor()).to.equal(ethers.BigNumber.from('0'));

    await buildingExample.callGoTo(ethers.BigNumber.from('100'));

    expect(await elevator.top()).to.equal(true);
    expect(await elevator.floor()).to.equal(ethers.BigNumber.from('100')); 
  });

});
