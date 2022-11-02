import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  const preservationLibOne = await deployments.get('PreservationLibOne');
  const preservationLibTwo = await deployments.get('PreservationLibTwo');

  await deploy('Preservation', {
    from: deployer,
    log: true,
    args: [preservationLibOne.address, preservationLibTwo.address]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['preservation'];
func.dependencies = ['preservationLibOne', 'preservationLibTwo'];
