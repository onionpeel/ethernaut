// import {expect} from "./utils/chai-setup";
// import {ethers, deployments, getNamedAccounts} from 'hardhat';
// import { Deployment } from "hardhat-deploy/dist/types";
// import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
// import {setup} from './utils/index';
// import type { MagicNum, Solver } from '../typechain-types';


// describe('MagicNum', () => {
//   let deployer: SignerWithAddress;
//   let user1: SignerWithAddress;
//   let magicNum: MagicNum;
//   let solver: Solver;

//   beforeEach(async () => {
//     ({deployer, user1} = await setup());

//     await deployments.fixture(['magicNum', 'solver']);

//     const MagicNumDeployment: Deployment = await deployments.get('MagicNum');
//     magicNum = await Promise.resolve(ethers.getContractAt('MagicNum', MagicNumDeployment.address) as Promise<MagicNum>);

//     const SolverDeployment: Deployment = await deployments.get('Solver');
//     solver = await Promise.resolve(ethers.getContractAt('Solver', SolverDeployment.address) as Promise<Solver>);
//   });


//   it('', async () => {
//     console.log('magic number: ', (await solver.whatIsTheMeaningOfLife()).toString());
//     console.log(solver.interface)
//   });

// });
