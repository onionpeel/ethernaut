import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const king = await deployments.get('King');

  await deploy('KingCaller', {
    from: deployer,
    log: true,
    args: [king.address]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['kingCaller'];
func.dependencies = ['king'];
