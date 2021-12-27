import { useCallback } from 'react'

import { useFaucetContract, useStableFaucetContract } from 'hooks/useContract'
import { testStableCoinsTokens } from 'constants/addresses'
import { useAddPopup } from 'state/application/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { t } from '@lingui/macro'
import { AppState } from 'state'
import { useSelector } from 'react-redux'
import { useAppDispatch } from 'state/hooks'
import { setFaucetLoading } from './actions'

export const useDistributeToken = ({ address, symbol }: { address: string; symbol: string; name: string }) => {
  const faucetContract = useFaucetContract(address)
  const stableFaucetContract = useStableFaucetContract(address)
  const addPopup = useAddPopup()
  const addTransaction = useTransactionAdder()
  const dispatch = useAppDispatch()
  return useCallback(async () => {
    const showError = (message: string) => {
      addPopup({
        info: {
          success: false,
          summary: message,
        },
      })
    }
    try {
      const isStableCoin = testStableCoinsTokens.filter((token) => token.address === address).length > 0
      const usedContract = isStableCoin ? stableFaucetContract : faucetContract
      if (usedContract) {
        dispatch(setFaucetLoading({ loading: true }))
        const timeToFaucetFun = usedContract?.timeToFaucet || usedContract?.getTimeToFaucet
        const { _hex } = await timeToFaucetFun()
        const minutesToWait = Math.ceil(parseInt(_hex, 16) / 60)
        if (minutesToWait !== 0) {
          showError(`You have to wait ${minutesToWait} ${minutesToWait === 1 ? 'minute' : 'minutes'}`)
          dispatch(setFaucetLoading({ loading: false }))
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
        dispatch(setFaucetLoading({ loading: false }))
        return { transaction, minutesToWait }
      }
    } catch (e) {
      dispatch(setFaucetLoading({ loading: false }))
      showError(t`Could not use the faucet. Please try again later`)
    }
  }, [faucetContract, stableFaucetContract, address, symbol, addTransaction, addPopup])
}

export function useFaucetState(): AppState['faucet'] {
  return useSelector<AppState, AppState['faucet']>((state) => state.faucet)
}
