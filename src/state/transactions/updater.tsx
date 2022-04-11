import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useActiveWeb3React } from '../../hooks/web3'
import { updateBlockNumber } from '../application/actions'
import { useAddPopup, useBlockNumber } from '../application/hooks'
import { AppDispatch, AppState } from '../index'
import { checkedTransaction, finalizeTransaction, replaceSpeededTransaction } from './actions'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Web3 = require('web3') // for some reason import Web3 from web3 didn't see eth module

interface TxInterface {
  addedTime: number
  receipt?: Record<string, any>
  lastCheckedBlockNumber?: number
}

interface Log {
  transactionHash: string
  transactionIndex: number
}

export function shouldCheck(lastBlockNumber: number, tx: TxInterface): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

export default function Updater(): null {
  const [subscription, handleSubscription] = useState<any>(null)
  const { chainId, library, account } = useActiveWeb3React()

  const lastBlockNumber = useBlockNumber()

  const dispatch = useDispatch<AppDispatch>()
  const state = useSelector<AppState, AppState['transactions']>((state) => state.transactions)

  const transactions = useMemo(() => (chainId ? state[chainId] ?? {} : {}), [chainId, state])

  const pendingTransactions = useMemo(() => Object.values(transactions).filter((tx) => !tx.receipt), [transactions])

  useEffect(() => {
    if (library && pendingTransactions.length > 0 && !subscription) {
      const web3 = new Web3(library.provider)
      const newSubscription = web3.eth.subscribe('logs', {
        address: account,
      })
      handleSubscription(newSubscription)
      newSubscription.on('data', (data: Log) => {
        const nonce = data.transactionIndex
        pendingTransactions.forEach(({ hash, txResponse }) => {
          if (txResponse?.nonce === nonce) {
            dispatch(
              replaceSpeededTransaction({ oldHash: hash, newHash: data.transactionHash, chainId: chainId || 137 })
            )
          }
        })
      })
    }
  }, [library, pendingTransactions, account, chainId, dispatch, subscription])

  useEffect(() => {
    if (pendingTransactions.length === 0 && subscription) {
      subscription.unsubscribe()
      handleSubscription(null)
    }
  }, [pendingTransactions, subscription])

  // show popup on confirm
  const addPopup = useAddPopup()

  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return

    Object.keys(transactions)
      .filter((hash) => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach((hash) => {
        library
          .getTransactionReceipt(hash)
          .then((receipt) => {
            if (receipt) {
              dispatch(
                finalizeTransaction({
                  chainId,
                  hash,
                  receipt: {
                    blockHash: receipt.blockHash,
                    blockNumber: receipt.blockNumber,
                    contractAddress: receipt.contractAddress,
                    from: receipt.from,
                    status: receipt.status,
                    to: receipt.to,
                    transactionHash: receipt.transactionHash,
                    transactionIndex: receipt.transactionIndex,
                  },
                })
              )

              addPopup(
                {
                  txn: {
                    hash,
                    success: receipt.status === 1,
                    summary: transactions[hash]?.summary,
                  },
                },
                hash
              )

              // the receipt was fetched before the block, fast forward to that block to trigger balance updates
              if (receipt.blockNumber > lastBlockNumber) {
                dispatch(updateBlockNumber({ chainId, blockNumber: receipt.blockNumber }))
              }
            } else {
              dispatch(checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber }))
            }
          })
          .catch((error) => {
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, library, transactions, lastBlockNumber, dispatch, addPopup, pendingTransactions, account, subscription])

  return null
}
