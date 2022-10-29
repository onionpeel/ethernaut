import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { King, KingCaller } from '../typechain-types';


describe('King', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let king: King;
  let kingCaller: KingCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['king', 'kingCaller']);

    const KingDeployment: Deployment = await deployments.get('King');
    king = await Promise.resolve(ethers.getContractAt('King', KingDeployment.address) as Promise<King>);

    const KingCallerDeployment: Deployment = await deployments.get('KingCaller');
    kingCaller = await Promise.resolve(ethers.getContractAt('KingCaller', KingCallerDeployment.address) as Promise<KingCaller>);
  });


  it('Takes ownership and drains contract', async () => {
    expect(await king._king()).to.equal(deployer.address);
    await kingCaller.connect(user1).callKing({value: ethers.utils.parseEther('20')});
    expect(await king._king()).to.equal(kingCaller.address);

    await expect(deployer.sendTransaction({
      to: king.address,
      value: ethers.utils.parseEther('30')
    })).to.be.reverted;
  });

});
