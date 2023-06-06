import {
    Provider,
    Contract,
    Account,
    ec,
    json,
    uint256,
    RpcProvider,
} from "starknet";
import { SpiritStoneABI, SpiritStoneAddress } from "./spiritStone.mjs";
import { myBook, ABIETHMainnet, AddrETH } from "./starkSetup.mjs";
import chalk from "chalk";
import * as myStarkAPI from "./starkAPI.mjs";
import * as myFunctions from "./functions.js";

const provider = new RpcProvider({
    nodeUrl: "https://starknet-mainnet.g.alchemy.com/v2/yourapikey",
});
//const provider = new Provider({ sequencer: { network: "mainnet-alpha" } });
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
async function checkMintAvailability(erc20SPIST) {
    console.log(chalk.bold.bgCyan(`check mint availability`));
    let _count = await erc20SPIST.available_mint_count();
    let count = uint256.uint256ToBN(_count).toString();
    console.log(`available_mint_count=${count}, typeof=${typeof count}`);
    if (Number(count) === 0) {
        console.log(chalk.bold.bgGreen(`no availability`));
        return false;
    } else {
        return true;
    }
}

async function mintSPIST(erc20SPIST) {
    //
    const resu = await erc20SPIST.mint();
    await provider.waitForTransaction(resu.transaction_hash);
}

async function scheduleJob() {
    console.log(chalk.bold.bgYellow("working on..."));
    console.log(
        chalk.bold.bgYellow("connecting erc20SPIST and prepare interact")
    );
    const erc20 = new Contract(SpiritStoneABI, SpiritStoneAddress, provider);
    erc20.connect(myAccount);
    let successCounter = 0;

    let thisRoundSuccessMint = 0;
    while (true) {
        let availability = false;
        //availability = await checkMintAvailability(erc20);
        availability = true;
        let successDelay = 100;
        let failDelay = 200;

        if (availability) {
            console.log(chalk.bold.bgGreen(`sucess=${successCounter} times`));
            try {
                successCounter += 1;
                await mintSPIST(erc20);
                console.log(chalk.bold.bgGreen(`sucess mint and wait another`));
                successDelay = 100;
            } catch (error) {
                console.log(chalk.bold.redBright("tx failed and try again"));
                console.log(error);
                successCounter -= 1;
                await myFunctions.sleep(failDelay);
                successDelay = 200;
            }
        }
        await myFunctions.sleep(successDelay);
    }
    console.log(chalk.bold.bgYellow("finished"));
}

const main = async () => {
    console.log(chalk.bold.bgGreen("1. check thenetworkstatus"));
    const myName = await myStarkAPI.checkNetWorkStatus(provider, myAddr);
    console.log(`your starknet id:${myName}, network is good to go.`);
    console.log(chalk.bold.bgGreen("2. check my account eth balance"));
    let initBal = await myStarkAPI.checkEthBalance(provider, myName, myAddr);
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
