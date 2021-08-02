import { Currency, CurrencyAmount } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useCallback, useMemo } from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import { StyledBalanceMax } from '.'

export interface Props {
  amount: CurrencyAmount<Currency> | undefined
  onInput: (param: string) => void
  currency?: Currency | null
  onMax?: () => void
}
export const MaxButton = ({ amount, onInput, currency, onMax }: Props) => {
  const { account } = useActiveWeb3React()
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const maxInputAmount: CurrencyAmount<Currency> | undefined = useMemo(() => maxAmountSpend(balance), [balance])

  const showMaxButton = Boolean(maxInputAmount?.greaterThan(0) && !amount?.equalTo(maxInputAmount))

  const handleMaxInput = useCallback(() => {
    maxInputAmount && onInput(maxInputAmount.toExact())
    onMax && onMax()
  }, [maxInputAmount, onInput, onMax])

  return (
    <>
      {showMaxButton && balance ? (
        <StyledBalanceMax onClick={handleMaxInput}>
          <Trans>Max</Trans>
        </StyledBalanceMax>
      ) : null}
    </>
  )
}
