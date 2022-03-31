import React, { useMemo } from 'react'
import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'

import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import { useDepositModalToggle } from 'state/application/hooks'
import { TYPE } from 'theme'
import { CustodianInfo } from 'components/Vault/enum'
import { MouseoverTooltip } from 'components/Tooltip'

import { BalanceRow } from './BalanceRow'
import { HistoryBlock } from './HistoryBlock'
import { ExistingTitle, ExistingWrapper, StyledTitle, TitleStatusRow } from './styleds'

interface Props {
  currency?: Currency
  custodian?: CustodianInfo
  token: any
}
export const ExistingVault = ({ currency, custodian, token }: Props) => {
  const symbolText = useMemo(() => token?.ticker ?? currency?.symbol, [currency?.symbol, token?.ticker])
  const { account } = useActiveWeb3React()
  const toggle = useDepositModalToggle()

  return (
    <ExistingWrapper>
      <TitleStatusRow style={{ marginBottom: '0.6rem' }}>
        <ExistingTitle>
          <StyledTitle>
            <Trans>My {symbolText} Vault</Trans>
          </StyledTitle>
          <TYPE.description2 color={'text1'}>
            <Trans>on {custodian?.name} custodian</Trans>
          </TYPE.description2>
        </ExistingTitle>
        <MouseoverTooltip text={!token.allowDeposit ? 'Deposit are not available yet for this token' : ''}>
          <ButtonIXSGradient
            data-testid="deposit"
            style={{ width: '230px' }}
            onClick={() => toggle()}
            disabled={!token.allowDeposit}
          >
            <Trans>Deposit</Trans>
          </ButtonIXSGradient>
        </MouseoverTooltip>
      </TitleStatusRow>
      <BalanceRow currency={currency} account={account} token={token} />
      <HistoryBlock currency={currency} account={account} />
    </ExistingWrapper>
  )
}
