import { useCallback } from 'react'

import { useFaucetContract } from 'hooks/useContract'
import { useTransactionAdder } from 'state/transactions/hooks'
import { shortAddress } from 'utils'

export const useDistributeToken = (tokenAddress: string) => {
  const addTransaction = useTransactionAdder()
  const faucetContract = useFaucetContract(tokenAddress)

  return useCallback(async () => {
    if (faucetContract) {
      const { _hex } = await faucetContract.timeToFaucet()
      const minutesToWait = Math.ceil(parseInt(_hex, 16) / 60)
      const result = await faucetContract.faucet({
        gasLimit: 900000,
      })
      const finished = await result.wait()

      addTransaction(
        { ...finished, hash: finished.transactionHash },
        {
          summary:
            minutesToWait === 0
              ? `Sent to ${shortAddress(finished.to || '')}`
              : `You have to wait ${minutesToWait} ${minutesToWait === 1 ? 'minute' : 'minutes'}`,
        }
      )
    }
  }, [faucetContract])
}
