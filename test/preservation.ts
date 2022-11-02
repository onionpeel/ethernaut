import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Preservation, PreservationLibOne, PreservationLibTwo } from '../typechain-types';

// Goal: Claim ownership of the contract below to complete this level.

describe('Preservation', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let preservation: Preservation;
  let preservationLibOne: PreservationLibOne;
  let preservationLibTwo: PreservationLibTwo;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['preservation', 'preservationLibOne', 'preservationLibTwo']);

    const PreservationDeployment: Deployment = await deployments.get('Preservation');
    preservation = await Promise.resolve(ethers.getContractAt('Preservation', PreservationDeployment.address) as Promise<Preservation>);

    const PreservationLibOneDeployment: Deployment = await deployments.get('PreservationLibOne');
    preservationLibOne = await Promise.resolve(ethers.getContractAt('PreservationLibOne', PreservationLibOneDeployment.address) as Promise<PreservationLibOne>);

    const PreservationLibTwoDeployment: Deployment = await deployments.get('PreservationLibTwo');
    preservationLibTwo = await Promise.resolve(ethers.getContractAt('PreservationLibTwo', PreservationLibTwoDeployment.address) as Promise<PreservationLibTwo>);
  });


  it('', async () => {
    expect(await preservation.owner()).to.equal(deployer.address);
    await preservation.connect(user1).setFirstTime(ethers.BigNumber.from('1000'));
    expect(await preservation.owner()).to.equal(user1.address);
  });

});
