import Web3 from 'web3'
import { Abi } from './web3Data'

export class Web3Helpers {
  web3;

  constructor() {
    this.web3 = new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${process.env.INFURA_KEY}`))
  }

  async getTokenBalance(tokenAddress, walletAddress) {
    const contract = new this.web3.eth.Contract(Abi, tokenAddress, {from: walletAddress});
    const balance = await contract.methods.balanceOf(walletAddress).call()
      .then(function(result) {
        return result
      });
    return balance
  }

  async getEthBalance(address) {
    try {
      const balance = await this.web3.eth.getBalance(address);

      return await this.web3.utils.fromWei(balance, 'ether')
    } catch (e) {
      throw new Error('Eth balance checking failed:' + e)
    }
  }

  async sendCrypto(wallet, addressTo, amount) {
    try {
      // create transaction
      const createTransaction = await this.web3.eth.accounts.signTransaction(
        {
          from: wallet.ethAddress,
          to: addressTo,
          value: this.web3.utils.toWei(amount.toString()),
          gas: '2000000',
        }, wallet.privateKey);

      // deploy transaction
      await this.web3.eth.sendSignedTransaction(createTransaction.rawTransaction);
    } catch (e) {
      throw new Error('Sending crypto failed:' + e)
    }
  }
}
