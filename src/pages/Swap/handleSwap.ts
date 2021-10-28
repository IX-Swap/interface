import { Percent } from '@ixswap1/sdk-core'
import { useActiveWeb3React } from 'hooks/web3'
import { useCallback } from 'react'
import ReactGA from 'react-ga'
import { useDerivedSwapInfo, useSwapState } from 'state/swap/hooks'
import { useOpenModal, usePersistAuthorization, useSetSwapState } from 'state/swapHelper/hooks'
import confirmPriceImpactWithoutFee from '../../components/swap/confirmPriceImpactWithoutFee'
import useENSAddress from '../../hooks/useENSAddress'
import {
  useAuthorizationDigest,
  useSwapCallback,
  useSwapCallbackError,
  useSwapSecTokenAddresses,
} from '../../hooks/useSwapCallback'
import { Version } from '../../hooks/useToggledVersion'
import { useUserSingleHopOnly } from '../../state/user/hooks'

export function useHandleSwap({ priceImpact }: { priceImpact: Percent | undefined }) {
  const { showConfirm, tradeToConfirm, setSwapState } = useSetSwapState()
  const { account } = useActiveWeb3React()
  const { toggledTrade: trade, allowedSlippage, shouldGetAuthorization } = useDerivedSwapInfo()
  const { recipient } = useSwapState()
  const { setOpenModal } = useOpenModal()
  const getSwapCallback = useSwapCallback(trade, allowedSlippage, recipient)
  const { address: recipientAddress } = useENSAddress(recipient)

  const [singleHopOnly] = useUserSingleHopOnly()
  // if missing authorization, don't swap. after successful swap, clear all authorizations
  const authorizationDigest = useAuthorizationDigest(trade)
  const clearAuthorization = usePersistAuthorization()
  const swapSecTokens = useSwapSecTokenAddresses(trade)
  const { error: swapCallbackError } = useSwapCallbackError(trade, allowedSlippage, recipient)

  return useCallback(async () => {
    const { callback: swapCallback } = await getSwapCallback()
    if (swapCallbackError || !swapCallback || shouldGetAuthorization) {
      return
    }
    if (priceImpact && !confirmPriceImpactWithoutFee(priceImpact)) {
      return
    }
    setSwapState({ attemptingTxn: true, tradeToConfirm, showConfirm, swapErrorMessage: undefined, txHash: undefined })
    setOpenModal(true)
    try {
      const hash = await swapCallback()
      if (authorizationDigest && swapSecTokens.length && !swapSecTokens.every((address) => address === null)) {
        for (const address in swapSecTokens) {
          await clearAuthorization(null, address)
        }
      }
      setSwapState({
        attemptingTxn: false,
        tradeToConfirm: undefined,
        showConfirm: false,
        swapErrorMessage: undefined,
        txHash: hash,
      })

      ReactGA.event({
        category: 'Swap',
        action:
          recipient === null
            ? 'Swap w/o Send'
            : (recipientAddress ?? recipient) === account
            ? 'Swap w/o Send + recipient'
            : 'Swap w/ Send',
        label: [
          trade?.inputAmount?.currency?.symbol,
          trade?.outputAmount?.currency?.symbol,
          Version.v2,
          singleHopOnly ? 'SH' : 'MH',
        ].join('/'),
      })
    } catch (error) {
      setSwapState({
        attemptingTxn: false,
        tradeToConfirm,
        showConfirm,
        swapErrorMessage: (error as any)?.message as string,
        txHash: undefined,
      })
    }
  }, [
    priceImpact,
    getSwapCallback,
    tradeToConfirm,
    showConfirm,
    recipient,
    recipientAddress,
    account,
    trade,
    singleHopOnly,
    authorizationDigest,
    shouldGetAuthorization,
    swapSecTokens,
    clearAuthorization,

    swapCallbackError,

    setOpenModal,
    setSwapState,
  ])
}
