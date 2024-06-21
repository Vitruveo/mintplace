
const {Web3} = require("web3");
const isTestnet = process.env.NEXT_PUBLIC_TESTNET == "true";
const web3 = new Web3(isTestnet ? process.env.TESTNET_RPC : process.env.MAINNET_RPC);

async function fund(target, value) {
    const sender = web3.eth.accounts.wallet.add(process.env.SERVICE_PRIVATE_KEY)[0];
    let nonce = await web3.eth.getTransactionCount(sender.address, "pending");

    const txInfo = {
        nonce: web3.utils.toHex(nonce),
        from: sender.address,
        to: target,
        gas: 210000,
        gasPrice: 4000000000,
        value
    };

    const txReceipt = await web3.eth.sendTransaction(txInfo);
    
    return txReceipt;
}

export async function POST(request) {
    const apiKey = request.headers.get("X-Api-Key");
    if (apiKey !== process.env.API_KEY) {
        new NextResponse(null, {
            status: 500
        });
    }
    const data = await request.json();

    let target = 2000000000000000;
    console.log('Service balance', await web3.eth.getBalance('0xAe45ef92b7a39b737a4b9616eEbBeCFFf0BcC60a'));
    const funds =  await web3.eth.getBalance(data.connectedAddress);
    if (funds < target) {
        await fund(data.connectedAddress, target);
    }
    return Response.json(target);
}


