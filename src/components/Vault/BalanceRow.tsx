import React, { useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import styled from 'styled-components'
import { Trans } from '@lingui/macro'

import { useWithdrawModalToggle } from 'state/application/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { DesktopOnly, MobileAndTablet, TYPE } from 'theme'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { AddWrappedToMetamask } from 'pages/SecTokenDetails/AddToMetamask'
import { useWithdrawState } from 'state/withdraw/hooks'

import { MouseoverTooltip } from 'components/Tooltip'

import { ExistingTitle, TitleStatusRow } from './styleds'
import { isPending } from './enum'
import { useUserState } from 'state/user/hooks'
import { ButtonGradientBorder } from 'components/Button'

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
      gap: 0px;
      flex-direction: row;
      font-size: 23px !important;
      line-height: 27px !important;
  `};
`
export const BalanceRow = ({ currency, account, token }: Props) => {
  const currencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const toggle = useWithdrawModalToggle()
  const { withdrawStatus } = useWithdrawState()
  const haveActiveWithdrawal = isPending(withdrawStatus.status || '')
  const { me } = useUserState()

  const tooltipText = useMemo(() => {
    if (me?.isWhitelisted) return ''

    if (!token.allowWithdrawal) return 'Withdrawal are not available yet for this token'

    if (haveActiveWithdrawal)
      return 'There is already 1 withdrawal request in progress. Please check its status and wait for completion or cancelation.'

    return ''
  }, [haveActiveWithdrawal, token.allowWithdrawal, me])

  const isDisabled = useMemo(() => {
    if (me?.isWhitelisted) return false

    return !token.allowWithdrawal || haveActiveWithdrawal
  }, [me, token.allowWithdrawal, haveActiveWithdrawal])

  return (
    <TitleStatusRow style={{ marginTop: '0.6rem' }}>
      <ExistingTitle>
        <TextWrap>
          <span style={{ marginRight: '10px' }}>{formatCurrencyAmount(currencyBalance, currency?.decimals ?? 18)}</span>
          <span>{currency?.symbol}</span>
        </TextWrap>
        <AddWrappedToMetamask token={token} />
      </ExistingTitle>
      <DesktopOnly>
        <MouseoverTooltip text={tooltipText}>
          <ButtonGradientBorder
            style={{ width: '230px' }}
            data-testid="withdraw"
            onClick={async () => {
              toggle()
            }}
            disabled={isDisabled}
          >
            <Trans>Withdraw</Trans>
          </ButtonGradientBorder>
        </MouseoverTooltip>
      </DesktopOnly>
      <MobileAndTablet style={{ width: '100%', marginTop: '0.6rem' }}>
        <MouseoverTooltip referenceStyle={{ width: '100%' }} text={tooltipText}>
          <ButtonGradientBorder
            style={{ width: '100%' }}
            data-testid="withdraw"
            onClick={async () => {
              toggle()
            }}
            disabled={isDisabled}
          >
            <Trans>Withdraw</Trans>
          </ButtonGradientBorder>
        </MouseoverTooltip>
      </MobileAndTablet>
    </TitleStatusRow>
  )
}
