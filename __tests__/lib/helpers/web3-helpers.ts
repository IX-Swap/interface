import Web3 from 'web3'
import provider from 'eth-provider'
const INFURA_ID = process.env.REACT_APP_INFURA_KEY
import { metamask } from './credentials'
import { Abi } from './text-helpers'

// const web3 = new Web3(provider(`wss://rinkeby.infura.io/ws/v3/${INFURA_ID}`))
const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/${INFURA_ID}`))

async function getBalanceOtherCurrency(address) {
  const omisegoContract = new web3.eth.Contract(Abi, address)
  let balance = await omisegoContract.methods.balanceOf('0x5455D6D8ae4263d69b29d1DeD8eCD361b6582Bfe').call()
  balance = web3.utils.fromWei(balance, 'ether')
  return balance
}

async function getEthBalance(address = metamask.contractAddresses.eth) {
  let balance = await web3.eth.getBalance(address)
  balance = web3.utils.fromWei(balance, 'ether')
  return balance
}
async function getBlockNumber(address = metamask.contractAddresses.eth) {
  const number = await web3.eth.getBlockNumber()
  const result = await web3.eth.getBlock(number)
  return result
}
export { getBalanceOtherCurrency, getBlockNumber, getEthBalance }
