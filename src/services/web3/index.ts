import Web3 from 'web3'

let _web3: any

const web3Service = {
  get web3() {
    if (_web3 === undefined) {
      let web3

      if (window.ethereum !== undefined) {
        web3 = new Web3(window.ethereum)
      } else if (window.web3 !== undefined) {
        web3 = new Web3(window.web3.currentProvider)
      } else {
        web3 = new Web3(
          new Web3.providers.HttpProvider('http://127.0.0.1:8545')
        )
        console.error(
          'Non-Ethereum browser detected. You should consider trying MetaMask!'
        )
      }

      _web3 = web3
    }

    return _web3
  },

  async getAccount() {
    const accounts = await this.web3.eth.requestAccounts()
    return accounts[0]
  },

  async signWallet(walletHash: string, walletAddress: string) {
    // TODO use ethers library to get Web3Provider
    const result = await this.web3.eth.personal.sign(walletHash, walletAddress)
    return result
  }
}

export default web3Service
