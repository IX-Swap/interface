import React from 'react'
import styled from 'styled-components'

import { PromptFooter } from './PromptFooter'

import { ReactComponent as KYCPromptIcon } from 'assets/launchpad/svg/kyc-prompt-icon.svg'

export const KYCPrompt = () => {
  return (
    <KYCPromptContainer>
      <KYCPromptIconContainer>
        <KYCPromptIcon />
      </KYCPromptIconContainer>

      <KYCPromptTitle>
        Verify your account to participate in the deals on IXS Launchpad
      </KYCPromptTitle>

      <VerifyButton>
        Verify Account
      </VerifyButton>

      <PromptFooter />
    </KYCPromptContainer>
  )
}

const KYCPromptContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  max-width: 480px;

  background: ${props => props.theme.launchpad.colors.background};
  border-radius: 8px;
`

const KYCPromptIconContainer = styled.div`
  display: grid;
  place-content: center;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 50%;

  width: 80px;
  height: 80px;
`
const KYCPromptTitle = styled.div``
const VerifyButton = styled.a``
