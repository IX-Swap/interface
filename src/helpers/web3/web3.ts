import Web3 from 'web3'
import { Abi } from './web3Data'
import { ethers } from 'ethers'

export class Web3Helpers {
  web3

  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider(
        `https://${process.env.REACT_APP_INFURA_NETWORK_SUBDOMAIN}.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
      )
    )
  }

  async getTokenBalance(tokenAddress: string | undefined, walletAddress: any) {
    const contract = new this.web3.eth.Contract(Abi, tokenAddress, { from: walletAddress })
    const balance = await contract.methods
      .balanceOf(walletAddress)
      .call()
      .then(function (result: any) {
        return result
      })
    const decimals: number = await contract.methods.decimals().call()
    // return balance * 10 ** decimals
    return balance / 10 ** decimals
  }

  async getEthBalance(address: string) {
    try {
      const balance = await this.web3.eth.getBalance(address)

      return ethers.utils.formatUnits(balance, 'ether')
    } catch (e) {
      throw new Error('Eth balance checking failed:' + e)
    }
  }

  async sendCrypto(wallet: { ethAddress: any; privateKey: string }, addressTo: any, amount: any) {
    try {
      // create transaction
      const createTransaction = await this.web3.eth.accounts.signTransaction(
        {
          from: wallet.ethAddress,
          to: addressTo,
          value: ethers.utils.formatUnits(amount.toString(), 'ether'),
          gas: '2000000',
        },
        wallet.privateKey
      )

      // deploy transaction
      await this.web3.eth.sendSignedTransaction(createTransaction.rawTransaction || '')
    } catch (e) {
      throw new Error('Sending crypto failed:' + e)
    }
  }
}
