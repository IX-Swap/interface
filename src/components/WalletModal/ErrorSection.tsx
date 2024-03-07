import { Trans } from '@lingui/macro'
import React from 'react'
import { CloseColor, CloseIcon, ContentWrapper, HeaderRow, UpperSection } from './styleds'

export const ErrorSection = ({ error, toggleWalletModal }: { error: any; toggleWalletModal: () => void }) => {
  return (
    <UpperSection>
      <CloseIcon onClick={toggleWalletModal}>
        <CloseColor />
      </CloseIcon>
      <HeaderRow>
        <Trans>Error connecting</Trans>
      </HeaderRow>
      <ContentWrapper>
        {error.code && error.code === -32002 && (
          <h5>
            <Trans>You already have a connection in progress. Please check your wallet extension/app </Trans>
          </h5>
        )}
        {error.code && error.code !== -32002 && (
          <Trans>Error connecting. Try refreshing the page.</Trans>
        )}
      </ContentWrapper>
    </UpperSection>
  )
}
