import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();


 let tx = await deploy('Vault', {
    from: deployer,
    log: true,
    args: [ethers.utils.solidityKeccak256(["string"], ["password"])],
    // if using dependency: args: [DependencyContract.address]
  });

  // console.log(tx);
};
export default func;

func.tags = ['vault'];
