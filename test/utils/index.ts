import {ethers, getNamedAccounts} from 'hardhat';

const setup = async () => {
  const namedAccounts = await getNamedAccounts();
  const signers: any = {};
  for (let i = 0; i < Object.keys(namedAccounts).length; i++) {
    signers[Object.keys(namedAccounts)[i]] =
      await ethers.getSigner(Object.values(namedAccounts)[i])
  };
  return signers;
};

export {setup};
