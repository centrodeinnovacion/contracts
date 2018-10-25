require('dotenv').config()
const HDWalletProvider = require('truffle-hdwallet-provider')
const mnemonic         = process.env.mnemonic
const apikey           = process.env.apikey
const host             = process.env.host

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*'
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, `${host}/${apikey}`),
      network_id: 3,
      gas: 4000000
    }
  }
}
