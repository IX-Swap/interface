import { Trans } from '@lingui/macro'
import { EmptyStateInfoCard } from 'components/Card'
import Column from 'components/Column'
import { ConnectWallet } from 'pages/Pool/ConnectWallet'
import React from 'react'
import { PrerequesiteMessageWrapper } from './styleds'
import styled from 'styled-components'

const ResponsiveColumn = styled(Column)`
  padding-top: 36px;
  @media (max-width: 500px) {
    padding-top: 0.7rem;
  }
`
export const PrerequisiteMessage = ({ account }: { account?: string | null }) => {
  return (
    <ResponsiveColumn>
      {!account ? (
        <ConnectWallet message={<Trans>Connect to a wallet to find pools</Trans>} />
      ) : (
        <PrerequesiteMessageWrapper>
          <EmptyStateInfoCard>
            <Trans>Choose token to find your liquidity</Trans>
          </EmptyStateInfoCard>
        </PrerequesiteMessageWrapper>
      )}
    </ResponsiveColumn>
  )
}
