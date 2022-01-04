import Web3 from 'web3'

interface Web3Service {
  web3: any
  getAccount: (walletAddress: string) => Promise<void>
  signWallet: (walletHash: string, walletAddress: string) => Promise<string>
}

let _web3: any

const web3Service: Web3Service = {
  get web3() {
    if (_web3 === undefined) {
      let web3

      if (window.ethereum !== undefined) {
        web3 = new Web3(window.ethereum)
      } else if (window.web3 !== undefined) {
        web3 = new Web3(window.web3.currentProvider)
      } else {
        throw new Error('Metamask is not installed')
      }

      _web3 = web3
    }

    return _web3
  },

  async getAccount(walletAddress: string) {
    try {
      const accounts: string[] = await this.web3.eth.requestAccounts()
      if (!accounts.includes(walletAddress))
        throw new Error('Something went wrong... please try again')
    } catch (e) {
      throw new Error('Failed to connect to Metamask, please try again')
    }
  },

  async signWallet(walletHash: string, walletAddress: string) {
    // in the future we might want to use ethers library to get Web3Provider
    const result = await this.web3.eth.personal.sign(walletHash, walletAddress)
    return result
  }
}

export default web3Service
