import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonGradientBorder } from 'components/Button'
import React from 'react'
import { useWithdrawModalToggle } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { ExistingTitle, TitleStatusRow } from './styleds'
import styled from 'styled-components'
interface Props {
  currency?: Currency
  account?: string | null
}
const TextWrap = styled(TYPE.titleBig)`
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */
  word-break: break-all;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      display: flex;
      gap: 10px;
      flex-direction: column;
      font-size: 23px !important;
      line-height: 27px !important;
  `};
`
export const BalanceRow = ({ currency, account }: Props) => {
  const currencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  console.log('balance', currency)
  const toggle = useWithdrawModalToggle()
  return (
    <TitleStatusRow>
      <ExistingTitle>
        <TextWrap>
          <span>{formatCurrencyAmount(currencyBalance, currency?.decimals ?? 18)}</span>
          <span style={{ marginLeft: '10px' }}>{currency?.symbol}</span>
        </TextWrap>
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
