import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { CoinFlip, CoinFlipCaller } from '../typechain-types';

/** Goal: This is a coin flipping game where you need to build up your winning streak by guessing the outcome of a coin flip. To complete this level you'll need to use your psychic abilities to guess the correct outcome 10 times in a row. */

describe('CoinFlip', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let coinFlip: CoinFlip;
  let coinFlipCaller: CoinFlipCaller;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['coinFlip', 'coinFlipCaller']);

    const CoinFlipDeployment: Deployment = await deployments.get('CoinFlip');
    coinFlip = await Promise.resolve(ethers.getContractAt('CoinFlip', CoinFlipDeployment.address) as Promise<CoinFlip>);

    const CoinFlipCallerDeployment: Deployment = await deployments.get('CoinFlipCaller');
    coinFlipCaller = await Promise.resolve(ethers.getContractAt('CoinFlipCaller', CoinFlipCallerDeployment.address) as Promise<CoinFlipCaller>);
  });


  it('Successfully predict coinFlip call 10 times in a row', async () => {
    for (let i = 0; i < 10; i++) {
      await coinFlipCaller.callFlip();
    };

    let consecutiveWins = await coinFlip.consecutiveWins();
    console.log(consecutiveWins.toString())

  });

});
