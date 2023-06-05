import { Provider, Contract, Account, ec, json, uint256 } from "starknet";
import { SpiritStoneABI, SpiritStoneAddress } from "./spiritStone.mjs";
import { myBook, ABIETHMainnet, AddrETH } from "./starkSetup.mjs";
import chalk from "chalk";
import * as myStarkAPI from "./starkAPI.mjs";
import * as myFunctions from "./functions.js";

const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });
console.log(provider);
const myAddr = myBook.get("B01")[0];
const myPubKey = myBook.get("B01")[1];
const myPrivKey = myBook.get("B01")[2];

const myKeyPair = ec.getKeyPair(myPrivKey);
const myAccount = new Account(provider, myAddr, myKeyPair);

const getMethods = (obj) => {
    let properties = new Set();
    let currentObj = obj;
    do {
        Object.getOwnPropertyNames(currentObj).map((item) =>
            properties.add(item)
        );
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    return [...properties.keys()].filter(
        (item) => typeof obj[item] === "function"
    );
};

console.log(getMethods(provider));

async function mintSPIST() {
    //
    const erc20 = new Contract(
        SpiritStoneABI,
        SpiritStoneAddress,
        provider
    );
    erc20.connect(myAccount);
    const resu = await erc20.mint();
    await provider.waitForTransaction(resu.transaction_hash);
}

async function scheduleJob() {
    console.log(chalk.bold.bgYellow("working on..."));
    while (true) {
        await myFunctions.sleep(1000);
        try {
            await mintSPIST();
        } catch (error) {
            console.log(chalk.bold.redBright("finished"));
            console.log(error);
        }
        await myFunctions.sleep(1000);
    }
    console.log(chalk.bold.bgYellow("finished"));
}

const main = async () => {
    console.log(chalk.bold.bgGreen("1. check thenetworkstatus"));
    const myName = await myStarkAPI.checkNetWorkStatus(provider, myAddr);
    console.log(`your starknet id:${myName}, network is good to go.`);
    console.log(chalk.bold.bgGreen("2. check my account eth balance"));
    let initBal = await myStarkAPI.checkEthBalance(
        provider,
        myName,
        myAddr
    );
    console.log(chalk.bold.bgGreen("3. schedule the job..."));
    await scheduleJob();
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
