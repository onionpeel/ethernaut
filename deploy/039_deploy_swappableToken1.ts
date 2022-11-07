import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const dex = await deployments.get('Dex');

  await deploy('SwappableToken1', {
    from: deployer,
    contract: 'SwappableToken',
    log: true,
    args: [dex.address, 'Swap1', 'S1', ethers.BigNumber.from('110')]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['swappableToken1'];
func.dependencies = ['dex'];
