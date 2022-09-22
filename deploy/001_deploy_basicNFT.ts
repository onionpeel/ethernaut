import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  // const DependencyContract = await deployments.get('DependencyContract');

  await deploy('BasicNFT', {
    from: deployer,
    log: true,
    args: [ethers.BigNumber.from('1000')]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['basicNFT'];
// func.dependencies = ['dependencyContract'];
