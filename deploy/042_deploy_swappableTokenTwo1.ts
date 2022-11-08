import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const dexTwo = await deployments.get('DexTwo');

  await deploy('SwappableTokenTwo1', {
    from: deployer,
    contract: 'SwappableTokenTwo',
    log: true,
    args: [dexTwo.address, 'SwapTwo1', 'STwo1', ethers.BigNumber.from('110')]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['swappableTokenTwo1'];
func.dependencies = ['dexTwo'];
