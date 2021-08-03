import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import React from 'react'
import { useWithdrawModalToggle } from 'state/application/hooks'
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
  const toggle = useWithdrawModalToggle()
  return (
    <TitleStatusRow>
      <ExistingTitle>
        <TYPE.titleBig>
          <Trans>
            {formatCurrencyAmount(currencyBalance, 18)} {currency?.symbol}
          </Trans>
        </TYPE.titleBig>
      </ExistingTitle>

      <ButtonGradientBorder
        data-testid="withdraw"
        style={{ width: '230px' }}
        onClick={() => {
          toggle()
        }}
      >
        <Trans>Withdraw</Trans>
      </ButtonGradientBorder>
    </TitleStatusRow>
  )
}
