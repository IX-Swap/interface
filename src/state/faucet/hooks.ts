import { t } from '@lingui/macro'
import { testStableCoinsTokens } from 'constants/addresses'
import { useFaucetContract, useStableFaucetContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useShowError } from 'state/application/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'

export const useDistributeToken = ({ address, symbol }: { address: string; symbol: string; name: string }) => {
  const faucetContract = useFaucetContract(address)
  const stableFaucetContract = useStableFaucetContract(address)
  const showError = useShowError()
  const addTransaction = useTransactionAdder()
  return useCallback(async () => {
    try {
      const isStableCoin = testStableCoinsTokens.filter((token) => token.address === address).length > 0
      const usedContract = isStableCoin ? stableFaucetContract : faucetContract
      if (usedContract) {
        const timeToFaucetFun = usedContract?.timeToFaucet || usedContract?.getTimeToFaucet
        const { _hex } = await timeToFaucetFun()
        const minutesToWait = Math.ceil(parseInt(_hex, 16) / 60)
        if (minutesToWait !== 0) {
          showError(`You have to wait ${minutesToWait} ${minutesToWait === 1 ? 'minute' : 'minutes'}`)
          return
        }

        const result = await usedContract.faucet({
          gasLimit: 900000,
        })
        addTransaction(
          { ...result, hash: result.hash },
          {
            summary: `Sent ${isStableCoin ? '100' : '10'} ${symbol} to your wallet`,
          }
        )
        const transaction = await result.wait()
        return { transaction, minutesToWait }
      }
    } catch (e) {
      showError(t`Could not use the faucet. Please try again later`)
    }
  }, [faucetContract, stableFaucetContract, address, symbol, addTransaction, showError])
}
