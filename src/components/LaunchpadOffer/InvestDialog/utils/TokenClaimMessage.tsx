import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Calendar } from 'react-feather'

export const TokenClaimMessage = () => {
  const theme = useTheme()

  return (
    <MessageContainer>
      <MessageText>
        You can claim your token on the Token Claim Date. 
        Once claimed, your tokens will be sent to your wallet address.
      </MessageText>

      <Calendar color={theme.launchpad.colors.info} size="40" />
    </MessageContainer>
  )
}

const MessageContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 1.5rem;
  padding: 1rem;

  background: ${props => props.theme.launchpad.colors.info + '0d'};
  border: 1px solid ${props => props.theme.launchpad.colors.info + '80'};
  border-radius: 6px;
`

const MessageText = styled.div`
  flex-grow: 1;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};

  opacity: 0.8;
`
