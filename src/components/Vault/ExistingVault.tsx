import { Currency } from '@ixswap1/sdk-core'
import { Trans } from '@lingui/macro'
import { ButtonIXSGradient } from 'components/Button'
import { useActiveWeb3React } from 'hooks/web3'
import React, { useMemo } from 'react'
import { TYPE } from 'theme'
import { AccreditationStatus } from './AccreditationStatus'
import { HistoryBlock } from './HistoryBlock'
import { BalanceRow } from './BalanceRow'
import { VaultState } from './enum'
import { AccreditationButtonRow, ExistingTitle, ExistingWrapper, TitleStatusRow } from './styleds'
import { Line } from 'components/Line'
import { RowEnd } from 'components/Row'
interface Props {
  currency?: Currency
  status: Exclude<VaultState, VaultState.NOT_SUBMITTED>
}
export const ExistingVault = ({ currency, status }: Props) => {
  const symbolText = useMemo(() => currency?.symbol ?? '', [currency?.symbol])
  const { account, chainId, library } = useActiveWeb3React()
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
          <ButtonIXSGradient
            style={{ width: '230px' }}
            onClick={() => {
              console.log(0)
            }}
          >
            <Trans>Deposit</Trans>
          </ButtonIXSGradient>
        )}
      </TitleStatusRow>
      {isApproved && <BalanceRow currency={currency} account={account} />}
      <HistoryBlock currency={currency} status={status} />
      {status === VaultState.REJECTED && (
        <>
          <Line />
          <AccreditationButtonRow>
            <ButtonIXSGradient
              style={{ width: '400px' }}
              onClick={() => {
                console.log(0)
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
