import { useCallback } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import * as H from 'history'

import { useNativeCurrency } from 'hooks/useNativeCurrency'

import { currencyId } from '../../utils/currencyId'

interface Props {
  currencyIdA?: string
  currencyIdB?: string
  history: H.History
}
export const useHandleCurrencySelect = ({ currencyIdA, currencyIdB, history }: Props) => {
  const native = useNativeCurrency()
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
    [currencyIdA, history, currencyIdB, native.symbol]
  )
  return { handleCurrencyASelect, handleCurrencyBSelect }
}
