import Web3 from 'web3'
const INFURA_ID = process.env.REACT_APP_INFURA_KEY
import { metamask } from '../testData/credentials'
import { Abi } from './text-helpers'

// const web3 = new Web3(provider(`wss://rinkeby.infura.io/ws/v3/${INFURA_ID}`))
const web3 = new Web3(new Web3.providers.HttpProvider(`https://kovan.infura.io/v3/${INFURA_ID}`))

async function getBalanceOtherCurrency(address) {
  try {
    const omisegoContract = new web3.eth.Contract(Abi, address)
    let balance = await omisegoContract.methods.balanceOf('0x5455D6D8ae4263d69b29d1DeD8eCD361b6582Bfe').call()
    balance = web3.utils.fromWei(balance, 'ether')
    return balance
  } catch (error) {
    console.error(error)
    throw new Error(`Error on the 'getBalanceOtherCurrency'`)
  }
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

async function sendCrypto({ addressFrom, addressTo, privKey, amount, cryptoType }) {
  console.log(`Attempting to make transaction from ${addressFrom} to ${addressTo}`)

  const createTransaction = await web3.eth.accounts.signTransaction(
    {
      from: addressFrom,
      to: addressTo,
      value: web3.utils.toWei(amount, cryptoType),
      gasPrice: '20000000000',
      gas: '21000',
    },
    privKey
  )

  // Deploy transaction
  const createReceipt = await web3.eth.sendSignedTransaction(createTransaction.rawTransaction)
  console.log(`Transaction successful with hash: ${createReceipt.transactionHash}`)
}

export { getBalanceOtherCurrency, getBlockNumber, getEthBalance, sendCrypto }
