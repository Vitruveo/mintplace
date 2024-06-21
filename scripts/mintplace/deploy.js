const { ethers, upgrades } = require("hardhat");
const hre = require("hardhat");
const path = require("path");
const fse = require("fs-extra");
const subProcess = require('child_process')

// npx hardhat run --network testnet scripts/mintplace/deploy.js
// npx hardhat run --network mainnet scripts/mintplace/deploy.js
// npx hardhat verify --contract contracts/MintPlace.sol:MintPlace --network testnet 0x097c44015c3ec3B2203afD66014BdC993Cd00F81
// npx hardhat verify --contract contracts/MintPlace.sol:MintPlace --network mainnet 0xFd1716e05225aFE88F6f6e973A155eb0377e1657

async function main() {
    const isMainNet = hre.network.name.toLowerCase() == 'mainnet';
    
    const MintPlace = await ethers.getContractFactory("MintPlace");
    const mintplace = await upgrades.deployProxy(MintPlace, { initializer: 'initialize' });
    await mintplace.waitForDeployment();
    const mintplaceAddress = await mintplace.getAddress();
    //const mintplaceAbi = MintPlace.interface.formatJson();
    console.log("\nMintPlace deployed to:", mintplaceAddress);

    // subProcess.exec(`npx hardhat verify --contract contracts/MintPlace.sol:MintPlace --network ${hre.network.name} ${mintplaceAddress}`, (err, stdout, stderr) => {
    //     console.log(`The stdout Buffer from shell: ${stdout.toString()}`)
    //     console.log(`The stderr Buffer from shell: ${stderr.toString()}`)
    // });

}

    // await fetch('/api/hydrate', {
        //                                 method: 'POST',
        //                                 headers: {
        //                                 'Content-Type': 'application/json',
        //                                 'X-Api-Key': apiKey,
        //                                 },
        //                                 body: JSON.stringify({connectedAddress: connectedAddress, x: 0}),
        //                             });

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});