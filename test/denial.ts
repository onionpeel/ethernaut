import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Denial, DenialRevert } from '../typechain-types';

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Denial', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let denial: Denial;
  let denialRevert: DenialRevert;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['denial', 'denialRevert']);

    const DenialDeployment: Deployment = await deployments.get('Denial');
    denial = await Promise.resolve(ethers.getContractAt('Denial', DenialDeployment.address) as Promise<Denial>);

    const DenialRevertDeployment: Deployment = await deployments.get('DenialRevert');
    denialRevert = await Promise.resolve(ethers.getContractAt('DenialRevert', DenialRevertDeployment.address) as Promise<DenialRevert>);
  });


  it('', async () => {
    await deployer.sendTransaction({
      to: denial.address,
      value: ethers.utils.parseEther('100')
    });
    expect(await ethers.provider.getBalance(denial.address)).to.equal(ethers.utils.parseEther('100'));
    await denial.connect(user1).setWithdrawPartner(denialRevert.address);

    // user1 receives 1%, but then the call reverts and the owner receives nothing
    await denial.withdraw();

    // let bal = await ethers.provider.getBalance(user1.address);
    // console.log(bal.toString())
  });

});
