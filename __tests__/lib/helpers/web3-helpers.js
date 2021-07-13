const fetch = require('node-fetch')
const TIMEOUT = 10000
const Web3 = require('web3')
const provider = require('eth-provider')
const INFURA_ID = process.env.REACT_APP_INFURA_KEY
const {ixswap}= require("./credentials")

const web3 = new Web3(provider(`wss://rinkeby.infura.io/ws/v3/${INFURA_ID}`))
module.exports = {

  getBalance: async (address=ixswap.ethAddress) => {
    const balance = await web3.eth.getBalance(address)
    return balance
  }
}


