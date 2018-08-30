var HDWalletProvider = require('truffle-hdwallet-provider');
require('dotenv').config();

module.exports = {
  networks: {
    development: {
      host: 'localhost',
      port: 7545,
      network_id: '*', // match any network
      gas: 6721975,
      gasPrice: 20000000000,
    },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.ETH_ACCOUNT_MNENOMIC,
          'https://ropsten.infura.io/v3/' + process.env.INFURA_API_KEY,
        ),
      network_id: 3,
      gas: process.env.DEFAULT_GAS,
      gasPrice: process.env.DEFAULT_GAS_PRICE,
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.ETH_ACCOUNT_MNENOMIC,
          'https://rinkeby.infura.io/v3/' + process.env.INFURA_API_KEY,
        ),
      network_id: 4,
      gas: process.env.DEFAULT_GAS,
      gasPrice: process.env.DEFAULT_GAS_PRICE,
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          process.env.ETH_ACCOUNT_MNENOMIC,
          'https://kovan.infura.io/v3/' + process.env.INFURA_API_KEY,
        ),
      network_id: 5,
      gas: process.env.DEFAULT_GAS,
      gasPrice: process.env.DEFAULT_GAS_PRICE,
    },
  },
  solc: {
    optimizer: {
      enabled: process.env.ENABLE_SOLC_OPTIMIZER === 'TRUE',
      runs: 200,
    },
  },
};
