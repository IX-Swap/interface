import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { useDepositModalToggle } from 'state/application/hooks'
import { TYPE } from 'theme'
import { BalanceRow } from './BalanceRow'
import { AccreditationStatusEnum } from './enum'
import { HistoryBlock } from './HistoryBlock'
import { ExistingTitle, ExistingWrapper, TitleStatusRow } from './styleds'
interface Props {
  currency?: Currency
}
export const ExistingVault = ({ currency }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? '', [currency?.symbol])
  const { account } = useActiveWeb3React()
  const toggle = useDepositModalToggle()

  return (
    <ExistingWrapper>
      <TitleStatusRow>
        <ExistingTitle>
          <TYPE.title4>
            <Trans>My {symbolText} Vault</Trans>
          </TYPE.title4>
        </ExistingTitle>
        <ButtonIXSGradient data-testid="deposit" style={{ width: '230px' }} onClick={() => toggle()}>
          <Trans>Deposit</Trans>
        </ButtonIXSGradient>
      </TitleStatusRow>
      <BalanceRow currency={currency} account={account} />
      <HistoryBlock currency={currency} />
    </ExistingWrapper>
  )
}
