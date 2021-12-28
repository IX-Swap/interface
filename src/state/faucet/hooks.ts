import { t } from '@lingui/macro'
import { ixSwapToken, testStableCoinsTokens } from 'constants/addresses'
import { useFaucetContract, useIXSFaucetContract, useStableFaucetContract } from 'hooks/useContract'
import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { useAddPopup, useShowError } from 'state/application/hooks'
import { useAppDispatch } from 'state/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { setFaucetLoading } from './actions'

export const useDistributeToken = ({
  address,
  symbol,
  contractAddress,
}: {
  address: string
  symbol: string
  name: string
  contractAddress?: string
}) => {
  const usedAddress = contractAddress ?? address
  const faucetContract = useFaucetContract(usedAddress)
  const stableFaucetContract = useStableFaucetContract(usedAddress)
  const IXSFaucetContract = useIXSFaucetContract(usedAddress)
  const addPopup = useAddPopup()
  const showError = useShowError()
  const addTransaction = useTransactionAdder()
  const dispatch = useAppDispatch()
  return useCallback(async () => {
    try {
      const isStableCoin = testStableCoinsTokens.filter((token) => token.address === address).length > 0
      const isIXS = ixSwapToken[0].address === address
      const usedContract = isStableCoin ? stableFaucetContract : isIXS ? IXSFaucetContract : faucetContract
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
  }, [faucetContract, stableFaucetContract, IXSFaucetContract, address, symbol, addTransaction, addPopup, showError])
}

export function useFaucetState(): AppState['faucet'] {
  return useSelector<AppState, AppState['faucet']>((state) => state.faucet)
}
