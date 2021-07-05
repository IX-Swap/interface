import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import React from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { ExistingTitle, TitleStatusRow } from './styleds'
interface Props {
  currency?: Currency
  account?: string | null
}
export const BalanceRow = ({ currency, account }: Props) => {
  const currencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  return (
    <TitleStatusRow>
      <ExistingTitle>
        <TYPE.titleBig>
          <Trans>
            {formatCurrencyAmount(currencyBalance, 4)} {currency?.symbol}
          </Trans>
        </TYPE.titleBig>
      </ExistingTitle>

      <ButtonGradientBorder
        style={{ width: '230px' }}
        onClick={() => {
          console.log(0)
        }}
      >
        <Trans>Withdraw</Trans>
      </ButtonGradientBorder>
    </TitleStatusRow>
  )
}
