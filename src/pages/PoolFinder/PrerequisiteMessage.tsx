import { Trans } from '@lingui/macro'
import { EmptyStateInfoCard } from 'components/Card'
import Column from 'components/Column'
import { ConnectWallet } from 'pages/Pool/ConnectWallet'
import React from 'react'

export const PrerequisiteMessage = ({ account }: { account?: string | null }) => {
  return (
    <Column style={{ paddingTop: '36px' }}>
      {!account ? (
        <ConnectWallet message={<Trans>Connect to a wallet to find pools</Trans>} />
      ) : (
        <Column style={{ padding: '0 36px 36px 36px', alignItems: 'center', gap: '20px' }}>
          <EmptyStateInfoCard>
            <Trans>Choose token to find your liquidity</Trans>
          </EmptyStateInfoCard>
        </Column>
      )}
    </Column>
  )
}
