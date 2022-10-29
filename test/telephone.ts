import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Telephone, TelephoneCaller } from '../typechain-types';

/**Claim ownership of the contract below to complete this level. */

describe('Telephone', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let telephone: Telephone;
  let telephoneCaller: TelephoneCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['telephone', 'telephoneCaller']);

    const TelephoneDeployment: Deployment = await deployments.get('Telephone');
    telephone = await Promise.resolve(ethers.getContractAt('Telephone', TelephoneDeployment.address) as Promise<Telephone>);

    const TelephoneCallerDeployment: Deployment = await deployments.get('TelephoneCaller');
    telephoneCaller = await Promise.resolve(ethers.getContractAt('TelephoneCaller', TelephoneCallerDeployment.address) as Promise<TelephoneCaller>);
  });


  it('Takes ownership of the contract', async () => {
    expect(await telephone.owner()).to.equal(deployer.address);
    await telephoneCaller.callChangeOwner(user1.address);
    expect(await telephone.owner()).to.equal(user1.address);
  });

});
