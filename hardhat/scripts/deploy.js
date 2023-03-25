// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const xchainERC721 = await hre.ethers.getContractFactory("xchainERC721");
  const xchainERC721contract = await xchainERC721.deploy(
    "0x8F5969b8Fa3727392385C5E74CF1AA91a4aC4b40"
  );

  await xchain_goerli_contract.deployed();

  console.log(` xchainERC721contract deployed to  : ${xchainERC721contract}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
