const HDWalletProvider = require("@truffle/hdwallet-provider"); // Correct import
const privateKey = "0xa072d9dcacccc10aafba626f215030f7a1cc1278a336a155d57ed38711d249bb"; // Your private key
module.exports = {
  networks: {
    besu: {
      provider: () => new HDWalletProvider({
        privateKeys: [privateKey],
        providerOrUrl: "http://127.0.0.1:8545"
      }),
      network_id: "2018",
      gas: 12000000,
      gasPrice: 0,
     
    }
  },
  compilers: {
    solc: {
      version: "0.8.20", // Match compilation output
      settings: {
        evmVersion: "london" // Target London to avoid PUSH0
      }
    }
  }
};