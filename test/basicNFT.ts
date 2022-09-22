import {expect} from "./chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import { MockContract, MockContractFactory, smock } from '@defi-wonderland/smock';
import {setup} from './utils/index';
import type { BasicNFT } from '../typechain-types';
// import type { BasicNFT, BasicNFT__factory } from '../typechain-types';


describe('BasicNFT', () => {
  let deployer: SignerWithAddress;
  let basicNFT: BasicNFT;

  // let basicNFT: MockContract<BasicNFT>;
  // let basicNFTFactory: MockContractFactory<BasicNFT__factory>;

  beforeEach(async () => {
    ({deployer} = await setup());

    await deployments.fixture(['basicNFT']);

    // basicNFTFactory = await smock.mock<BasicNFT__factory>('BasicNFT');
    // basicNFT = await basicNFTFactory.deploy();

    const BasicNFTDeployment: Deployment = await deployments.get('BasicNFT');
    basicNFT = await Promise.resolve(ethers.getContractAt('BasicNFT', BasicNFTDeployment.address) as Promise<BasicNFT>);
  });


  it('Total mints is set to 1000', async () => {
    expect(await basicNFT.totalMints())
      .to.equal(ethers.BigNumber.from('1000'));
  });

  // Note the brackets are used for function overloads in ethersjs
  // contractInstance = contractInstance.connect(accounts[0]);
  // await contractInstance["safeTransferFrom(address,address,uint256)"]
  //   ('0x....', '0x....', ethers.BigNumber.from('5'));


});
