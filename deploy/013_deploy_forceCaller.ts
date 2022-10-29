import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const force = await deployments.get('Force');

  await deploy('ForceCaller', {
    from: deployer,
    log: true,
    args: [force.address],
    value: ethers.utils.parseEther('15')
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['forceCaller'];
func.dependencies = ['force'];
