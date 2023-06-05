import chalk from "chalk";
import { ethers } from "ethers";
import { uint256, Contract } from "starknet";
import { ABIETHMainnet, AddrETH } from "./starkSetup.mjs";
import * as myFunctions from "./functions.js";

export async function checkNetWorkStatus(provider, myAddr) {
    const myName = await provider.getStarkName(myAddr);
    return myName;
}

export async function checkEthBalance(provider, myName, myAddr) {
    await myFunctions.sleep(1000);
    const erc20ETH = new Contract(ABIETHMainnet, AddrETH, provider);
    console.log(`Calling Starknet for account balance...`);
    const balanceBeforeTransfer = await erc20ETH.balanceOf(myAddr);
    let _bal = uint256
        .uint256ToBN(balanceBeforeTransfer.balance)
        .toString();
    const myBal = Number(ethers.utils.formatEther(_bal)).toFixed(6);
    console.log(chalk.bold.green(`name=${myName},bal=${myBal}`));
    return Number(myBal);
}
