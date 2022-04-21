import React from 'react'
import { Currency } from '@ixswap1/sdk-core'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { ButtonGradientBorder } from 'components/Button'
import { useWithdrawModalToggle } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { AddWrappedToMetamask } from 'pages/SecTokenDetails/AddToMetamask'

import { MouseoverTooltip } from 'components/Tooltip'
import { ExistingTitle, TitleStatusRow } from './styleds'

interface Props {
  currency?: Currency
  account?: string | null
  token: any
}

const TextWrap = styled(TYPE.titleBig)`
  white-space: pre-wrap; /* CSS3 */
  white-space: -moz-pre-wrap; /* Firefox */
  white-space: -pre-wrap; /* Opera <7 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* IE */
  word-break: break-all;
  line-height: 36px !important;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      display: flex;
      gap: 10px;
      flex-direction: column;
      font-size: 23px !important;
      line-height: 27px !important;
  `};
`
export const BalanceRow = ({ currency, account, token }: Props) => {
  const currencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const toggle = useWithdrawModalToggle()

  return (
    <TitleStatusRow>
      <ExistingTitle>
        <TextWrap>
          <span style={{ marginRight: '10px' }}>{formatCurrencyAmount(currencyBalance, currency?.decimals ?? 18)}</span>
          <span>{token?.ticker ?? currency?.symbol}</span>
        </TextWrap>
        <AddWrappedToMetamask token={token} />
      </ExistingTitle>
      <MouseoverTooltip text={!token.allowWithdrawal ? 'Withdrawal are not available yet for this token' : ''}>
        <ButtonGradientBorder
          data-testid="withdraw"
          style={{ width: '230px' }}
          onClick={async () => {
            toggle()
          }}
          disabled={!token.allowWithdrawal}
        >
          <Trans>Withdraw</Trans>
        </ButtonGradientBorder>
      </MouseoverTooltip>
    </TitleStatusRow>
  )
}
