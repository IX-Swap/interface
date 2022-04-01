import { useCallback } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { currencyId } from '../../utils/currencyId'
import * as H from 'history'
import { useNativeCurrency } from 'hooks/useNativeCurrency'

interface Props {
  currencyIdA?: string
  currencyIdB?: string
  history: H.History
}
export const useHandleCurrencySelect = ({ currencyIdA, currencyIdB, history }: Props) => {
  const handleCurrencyASelect = useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        history.push(`/add/${currencyIdB}/${currencyIdA}`)
      } else {
        history.push(`/add/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, history, currencyIdA]
  )
  const handleCurrencyBSelect = useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      const native = useNativeCurrency()
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          history.push(`/add/${currencyIdB}/${newCurrencyIdB}`)
        } else {
          history.push(`/add/${newCurrencyIdB}`)
        }
      } else {
        history.push(`/add/${currencyIdA ? currencyIdA : native.symbol || 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdA, history, currencyIdB]
  )
  return { handleCurrencyASelect, handleCurrencyBSelect }
}
