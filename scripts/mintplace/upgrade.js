const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");

// npx hardhat run --network testnet scripts/mintplace/upgrade.js 
// npx hardhat run --network mainnet scripts/mintplace/upgrade.js 
//npx hardhat verify --contract contracts/MintPlace.sol:MintPlace --network testnet 0x097c44015c3ec3B2203afD66014BdC993Cd00F81
//npx hardhat verify --contract contracts/MintPlace.sol:MintPlace --network mainnet 0xFd1716e05225aFE88F6f6e973A155eb0377e1657

async function main() {
  const isMainNet = hre.network.name.toLowerCase() == 'mainnet';
  const MintPlace = await ethers.getContractFactory("MintPlace");
  const mintplace = await upgrades.upgradeProxy(isMainNet ? '0xFd1716e05225aFE88F6f6e973A155eb0377e1657' : '0x097c44015c3ec3B2203afD66014BdC993Cd00F81', MintPlace);
  await mintplace.waitForDeployment();
  console.log("MintPlace deployed to:", await mintplace.getAddress());
}

main().catch((error) => {
   console.error(error);
   process.exitCode = 1;
 });