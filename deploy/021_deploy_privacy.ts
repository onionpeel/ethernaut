import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  // If importing a dependency contract
  // const DependencyContract = await deployments.get('DependencyContract');

  const bytes32Array = [];
  for (let i = 0; i < 3; i++) {
    let bytes32Word = ethers.utils.solidityKeccak256(['uint'], [i]);
    console.log(bytes32Word)
    bytes32Array.push(bytes32Word);
  };

  await deploy('Privacy', {
    from: deployer,
    log: true,
    args: [bytes32Array]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['privacy'];
// func.dependencies = ['dependencyContract'];
