import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const dexTwo = await deployments.get('DexTwo');

  await deploy('SwappableTokenTwo2', {
    from: deployer,
    contract: 'SwappableTokenTwo',
    log: true,
    args: [dexTwo.address, 'SwapTwo2', 'STwo2', ethers.BigNumber.from('110')]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['swappableTokenTwo2'];
func.dependencies = ['dexTwo'];
