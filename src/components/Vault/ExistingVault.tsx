import React, { useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { isMobile } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { ethers } from 'ethers'

import { useActiveWeb3React } from 'hooks/web3'
import { DesktopOnly, MobileAndTablet, TYPE } from 'theme'
import { CustodianInfo } from 'components/Vault/enum'
import { MouseoverTooltip } from 'components/Tooltip'
import styled from 'styled-components'
import { BalanceRow } from './BalanceRow'
import { HistoryBlock } from './HistoryBlock'
import { ExistingTitle, ExistingWrapper, StyledTitle, TitleStatusRow } from './styleds'
import { useUserState } from 'state/user/hooks'
import { PinnedContentButton } from 'components/Button'
import { formatCurrencyAmount } from 'utils/formatCurrencyAmount'
import { useCurrencyBalance, useWalletState } from 'state/wallet/hooks'
import { AddWrappedToMetamask } from 'pages/SecTokenDetails/AddToMetamask'
import { DepositView, setWalletState } from 'state/wallet'
import { useDepositActionHandlers } from 'state/deposit/hooks'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import { useHistory } from 'react-router-dom'

interface Props {
  currency?: Currency & { originalSymbol: string }
  custodian?: CustodianInfo
  token: any
}
export const ExistingVault = ({ currency, custodian, token }: Props) => {
  const history = useHistory();
  const dispatch = useDispatch()
  const symbolText = useMemo(() => token?.ticker ?? currency?.symbol, [currency?.symbol, token?.ticker])
  const { account } = useActiveWeb3React()
  const { onResetDeposit } = useDepositActionHandlers()
  const { me } = useUserState()
  const currencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const isDisabled = useMemo(() => {
    if (me?.isWhitelisted) return false

    return !token.allowDeposit
  }, [me, token.allowDeposit])
  const { secTokensBalance } = useWalletState()
  const currentToken = secTokensBalance[token?.token?.address]
  const defaultBalance = formatNumberWithDecimals(
    ethers.utils.formatUnits(currentToken?.balance || '0', currentToken?.decimals || 18),
    4
  )
  const currentBalance = formatCurrencyAmount(currencyBalance, currency?.decimals ?? 18)
  const balance = currentBalance !== '-' ? currentBalance : defaultBalance

  const TextWrap = styled(TYPE.titleBig)`
    white-space: pre-wrap; /* CSS3 */
    white-space: -moz-pre-wrap; /* Firefox */
    white-space: -pre-wrap; /* Opera <7 */
    white-space: -o-pre-wrap; /* Opera 7 */
    word-wrap: break-word; /* IE */
    word-break: break-all;
    line-height: 36px !important;
    ${({ theme }) => theme.mediaWidth.upToSmall`
      display: block;
      gap: 0px;
      flex-direction: row;
      font-size: 23px !important;
      line-height: 27px !important;
  `};
  `

  const handleDeposit = () => {
    history.push('/maintainance')
    // onResetDeposit()
    // dispatch(setWalletState({ isOpenDepositCard: true, depositView: DepositView.CREATE_REQUEST }))
  }
  return (
    <ExistingWrapper>
      <TitleStatusRow style={{ marginBottom: '0rem', justifyContent: isMobile ? 'center' : 'space-between' }}>
        <ExistingTitle>
          <StyledTitle style={{ marginBottom: '4px' }}>
            <Trans>My {symbolText} Vault</Trans>
          </StyledTitle>
          <ExistingTitle>
            <TextWrap style={{ color: '#6666FF', fontSize: '40px', fontWeight: 800, marginBottom: '4px' }}>
              <span style={{ marginRight: '10px' }}>{balance}</span>
              <span>{currency?.symbol}</span>
            </TextWrap>
          </ExistingTitle>
          <TYPE.body1>
            <Trans>on {custodian?.name} custodian</Trans>
          </TYPE.body1>
        </ExistingTitle>
        <DesktopOnly>
          <MouseoverTooltip text={isDisabled ? 'Deposit are not available yet for this token' : ''}>
            <PinnedContentButton
              style={{ width: '200px', marginTop: '45px', marginBottom: '10px' }}
              data-testid="deposit"
              onClick={handleDeposit}
              disabled={isDisabled}
            >
              <Trans>Deposit</Trans>
            </PinnedContentButton>
          </MouseoverTooltip>
          <BalanceRow currency={currency} account={account} token={token} />
        </DesktopOnly>
      </TitleStatusRow>
      <MobileAndTablet style={{ margin: '1rem 0 0.5rem 0', width: '100%' }}>
        <MouseoverTooltip
          referenceStyle={{ width: '100%' }}
          text={isDisabled ? 'Deposit are not available yet for this token' : ''}
        >
          <PinnedContentButton
            style={{ width: '100%' }}
            data-testid="deposit"
            onClick={handleDeposit}
            disabled={isDisabled}
          >
            <Trans>Deposit</Trans>
          </PinnedContentButton>
        </MouseoverTooltip>
        <BalanceRow currency={currency} account={account} token={token} />
      </MobileAndTablet>
      {!isMobile && <AddWrappedToMetamask token={token} />}

      <HistoryBlock currency={currency} account={account} />
    </ExistingWrapper>
  )
}
