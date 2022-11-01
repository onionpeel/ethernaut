import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const gatekeeperOne = await deployments.get('GatekeeperOne');

  await deploy('GatekeeperOneCaller', {
    from: deployer,
    log: true,
    args: [gatekeeperOne.address]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['gatekeeperOneCaller'];
func.dependencies = ['gatekeeperOne'];
