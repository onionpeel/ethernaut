import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const shop = await deployments.get('Shop');

  await deploy('ShopBuyer', {
    from: deployer,
    log: true,
    args: [shop.address]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['shopBuyer'];
func.dependencies = ['shop'];
