const { Web3 } = require("web3");
const web3 = new Web3("http://127.0.0.1:8545"); // Connect to Besu
async function createAccount() {
    const account = web3.eth.accounts.create();
    console.log("Address:", account.address);
    console.log("Private Key:", account.privateKey);
}
createAccount();