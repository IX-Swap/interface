import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { Line } from 'components/Line'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { useDepositModalToggle } from 'state/application/hooks'
import { useSecTokenId } from 'state/secTokens/hooks'
import { usePassAccreditation } from 'state/user/hooks'
import { TYPE } from 'theme'
import { AccreditationStatus } from './AccreditationStatus'
import { BalanceRow } from './BalanceRow'
import { VaultState } from './enum'
import { HistoryBlock } from './HistoryBlock'
import { AccreditationButtonRow, ExistingTitle, ExistingWrapper, TitleStatusRow } from './styleds'
interface Props {
  currency?: Currency
  status: Exclude<VaultState, VaultState.NOT_SUBMITTED>
}
export const ExistingVault = ({ currency, status }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? '', [currency?.symbol])
  const { account } = useActiveWeb3React()
  const toggle = useDepositModalToggle()
  const tokenId = useSecTokenId({ currencyId: (currency as any)?.address })
  const passAccreditation = usePassAccreditation()
  const isApproved = status === VaultState.APPROVED
  return (
    <ExistingWrapper>
      <TitleStatusRow>
        <ExistingTitle>
          <TYPE.title4>
            <Trans>My {symbolText} Vault</Trans>
          </TYPE.title4>
        </ExistingTitle>
        {!isApproved && <AccreditationStatus status={status} />}
        {isApproved && (
          <ButtonIXSGradient data-testid="deposit" style={{ width: '230px' }} onClick={() => toggle()}>
            <Trans>Deposit</Trans>
          </ButtonIXSGradient>
        )}
      </TitleStatusRow>
      {isApproved && <BalanceRow currency={currency} account={account} />}
      {isApproved && <HistoryBlock currency={currency} />}
      {status === VaultState.REJECTED && (
        <>
          <Line />
          <AccreditationButtonRow>
            <ButtonIXSGradient
              data-testid="pass-accreditation"
              style={{ width: '400px' }}
              onClick={() => {
                passAccreditation(tokenId, 0)
              }}
            >
              <Trans>Pass Accreditation</Trans>
            </ButtonIXSGradient>
          </AccreditationButtonRow>
        </>
      )}
    </ExistingWrapper>
  )
}
