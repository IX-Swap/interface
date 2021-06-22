import { Currency } from '@ixswap1/sdk-core'
import { useCallback } from 'react'
import { currencyId } from 'utils/currencyId'
import * as H from 'history'

interface Props {
  currencyIdA?: string
  currencyIdB?: string
  history: H.History
}

const useSelectCurrency = ({ currencyIdA, currencyIdB, history }: Props) => {
  const handleSelectCurrencyA = useCallback(
    (currency: Currency) => {
      if (currencyIdB && currencyId(currency) === currencyIdB) {
        history.push(`/remove/${currencyId(currency)}/${currencyIdA}`)
      } else {
        history.push(`/remove/${currencyId(currency)}/${currencyIdB}`)
      }
    },
    [currencyIdA, currencyIdB, history]
  )
  const handleSelectCurrencyB = useCallback(
    (currency: Currency) => {
      if (currencyIdA && currencyId(currency) === currencyIdA) {
        history.push(`/remove/${currencyIdB}/${currencyId(currency)}`)
      } else {
        history.push(`/remove/${currencyIdA}/${currencyId(currency)}`)
      }
    },
    [currencyIdA, currencyIdB, history]
  )
  return { handleSelectCurrencyA, handleSelectCurrencyB }
}

export default useSelectCurrency
