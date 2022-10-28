import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const coinFlip = await deployments.get('CoinFlip');

  await deploy('CoinFlipCaller', {
    from: deployer,
    log: true,
    args: [coinFlip.address]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['coinFlipCaller'];
func.dependencies = ['coinFlip'];
