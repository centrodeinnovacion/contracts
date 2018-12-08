require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic         = process.env.mnemonic
const apikey           = process.env.apikey

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/${apikey}`),
      network_id: 3,
      gas: 4000000
    },
    rsk: {
      provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co/'),
      gas : 2500000,
      gasPrice : 1,
      port: 4444,
      network_id: '*'
    }
  }
}
