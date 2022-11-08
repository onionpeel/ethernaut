import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts} = hre;
  const {deploy} = deployments;

  const {user1} = await getNamedAccounts();

  // If importing a dependency contract

  await deploy('DexTwoFakeToken', {
    from: user1,
    log: true,
    args: ['DexTwoFakeToken', 'DTFT', ethers.BigNumber.from('100000')]
    // if using dependency: args: [DependencyContract.address]
  });
};
export default func;

func.tags = ['dexTwoFakeToken'];
