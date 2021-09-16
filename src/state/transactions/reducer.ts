import { createReducer } from '@reduxjs/toolkit'
import {
  addTransaction,
  checkedTransaction,
  clearAllTransactions,
  finalizeTransaction,
  SerializableTransactionReceipt,
} from './actions'

const now = () => new Date().getTime()

export interface TransactionDetails {
  hash: string
  approval?: { tokenAddress: string; spender: string }
  summary?: string
  claim?: { recipient: string }
  receipt?: SerializableTransactionReceipt
  lastCheckedBlockNumber?: number
  addedTime: number
  confirmedTime?: number
  from: string
}

export interface TransactionState {
  transactionEnded: boolean
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

export const initialState: TransactionState = { transactionEnded: false }

export default createReducer(initialState, (builder) =>
  builder
    .addCase(addTransaction, (transactions, { payload: { chainId, from, hash, approval, summary, claim } }) => {
      if (transactions[chainId]?.[hash]) {
        throw Error('Attempted to add existing transaction.')
      }
      transactions.transactionEnded = false
      const txs = transactions[chainId] ?? {}
      txs[hash] = { hash, approval, summary, claim, from, addedTime: now() }
      transactions[chainId] = txs
    })
    .addCase(clearAllTransactions, (transactions, { payload: { chainId } }) => {
      if (!transactions[chainId]) return
      transactions[chainId] = {}
      transactions.transactionEnded = false
    })
    .addCase(checkedTransaction, (transactions, { payload: { chainId, hash, blockNumber } }) => {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      if (!tx.lastCheckedBlockNumber) {
        tx.lastCheckedBlockNumber = blockNumber
      } else {
        tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
      }
    })
    .addCase(finalizeTransaction, (transactions, { payload: { hash, chainId, receipt } }) => {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      tx.receipt = receipt
      tx.confirmedTime = now()
      transactions.transactionEnded = true
    })
)
