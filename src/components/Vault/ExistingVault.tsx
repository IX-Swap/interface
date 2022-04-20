import React, { useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import { useActiveWeb3React } from 'hooks/web3'
import { useDepositModalToggle } from 'state/application/hooks'
import { TYPE } from 'theme'
import { CustodianInfo } from 'components/Vault/enum'
import { MouseoverTooltip } from 'components/Tooltip'

import { BalanceRow } from './BalanceRow'
import { HistoryBlock } from './HistoryBlock'
import { ExistingTitle, ExistingWrapper, StyledButtonIXSGradient, StyledTitle, TitleStatusRow } from './styleds'
import { useUserState } from 'state/user/hooks'

interface Props {
  currency?: Currency & { originalSymbol: string }
  custodian?: CustodianInfo
  token: any
}
export const ExistingVault = ({ currency, custodian, token }: Props) => {
  const symbolText = useMemo(() => token?.ticker ?? currency?.symbol, [currency?.symbol, token?.ticker])
  const { account } = useActiveWeb3React()
  const toggle = useDepositModalToggle()
  const { me } = useUserState()

  const isDisabled = useMemo(() => {
    if (me?.isWhitelisted) return false

    return !token.allowDeposit
  }, [me, token.allowDeposit])

  return (
    <ExistingWrapper>
      <TitleStatusRow style={{ marginBottom: '0.6rem', width: '100%' }}>
        <ExistingTitle>
          <StyledTitle>
            <Trans>My {symbolText} Vault</Trans>
          </StyledTitle>
          <TYPE.description2 color={'text1'}>
            <Trans>on {custodian?.name} custodian</Trans>
          </TYPE.description2>
        </ExistingTitle>
        <MouseoverTooltip style={{ width: '100%' }} text={isDisabled ? 'Deposit are not available yet for this token' : ''}>
          <StyledButtonIXSGradient
            data-testid="deposit"
            onClick={() => toggle()}
            disabled={isDisabled}
          >
            <Trans>Deposit</Trans>
          </StyledButtonIXSGradient>
        </MouseoverTooltip>
      </TitleStatusRow>
      <BalanceRow currency={currency} account={account} token={token} />
      <HistoryBlock currency={currency} account={account} />
    </ExistingWrapper>
  )
}
