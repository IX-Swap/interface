import { Trans } from '@lingui/macro'
import { UnsupportedChainIdError } from '@web3-react/core'
import React from 'react'
import { CloseColor, CloseIcon, ContentWrapper, HeaderRow, UpperSection } from './styleds'

export const ErrorSection = ({ error, toggleWalletModal }: { error: any; toggleWalletModal: () => void }) => {
  return (
    <UpperSection>
      <CloseIcon onClick={toggleWalletModal}>
        <CloseColor />
      </CloseIcon>
      <HeaderRow>
        {error instanceof UnsupportedChainIdError ? <Trans>Wrong Network</Trans> : <Trans>Error connecting</Trans>}
      </HeaderRow>
      <ContentWrapper>
        {error instanceof UnsupportedChainIdError ? (
          <h5>
            <Trans>Please connect to the appropriate Ethereum network.</Trans>
          </h5>
        ) : (
          <Trans>Error connecting. Try refreshing the page.</Trans>
        )}
      </ContentWrapper>
    </UpperSection>
  )
}
