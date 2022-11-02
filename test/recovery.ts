import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Recovery, RecoveryImplementation } from '../typechain-types';

// Goal: Claim ownership of the contract below to complete this level.

describe('Recovery', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let recovery: Recovery;
  let recoveryImplementation: RecoveryImplementation;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['recovery', 'recoveryImplementation']);

    const RecoveryDeployment: Deployment = await deployments.get('Recovery');
    recovery = await Promise.resolve(ethers.getContractAt('Recovery', RecoveryDeployment.address) as Promise<Recovery>);

    const RecoveryImplementationDeployment: Deployment = await deployments.get('RecoveryImplementation');
    recoveryImplementation = await Promise.resolve(ethers.getContractAt('RecoveryImplementation', RecoveryImplementationDeployment.address) as Promise<RecoveryImplementation>);
  });


  it('', async () => {
    // The 'create' opcode generates addresses based on the sender's address and the nonce of the sender's account.  By using the create opcode in Recovery, it is possible to determine the address that will be created with the first nonce.  Then the code can be re-deployed and the simple token will be created, which is done in the first transaction, which uses the first nonce, which at the address that was already determined.
    // await recovery.clone(recoveryImplementation.address);
    // let tokenAddress = await recovery.destinationAddress();
    // console.log(tokenAddress);
    // 0x55652FF92Dc17a21AD6810Cce2F4703fa2339CAE

    await recovery.generateToken('Fake token', ethers.BigNumber.from('1000'));

    const simpleToken = await ethers.getContractAt('SimpleToken', '0x55652FF92Dc17a21AD6810Cce2F4703fa2339CAE');
    
    await deployer.sendTransaction({
      to: simpleToken.address,
      value: ethers.utils.parseUnits('1', 15)
    })

    let user1BeforeBalance = await (ethers.provider.getBalance(user1.address));

    await simpleToken.destroy(user1.address);

    let user1AfterBalance = await (ethers.provider.getBalance(user1.address));
    // console.log('Balance increase: ', (
    //   ethers.utils.formatEther(user1AfterBalance.sub(user1BeforeBalance))
    //   ));
  });

});
