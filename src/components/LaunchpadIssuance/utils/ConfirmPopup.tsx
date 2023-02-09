import React from 'react'
import styled, { useTheme } from 'styled-components'
import { t } from '@lingui/macro'

import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Message, MessageSubtitle } from 'components/LaunchpadIssuance/IssuanceForm/shared/PopUps/message'

interface Props {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
  title?: string
  subtitle?: string
  acceptText?: string
  declineText?: string
}

export const ConfirmPopup: React.FC<Props> = ({ onDecline, onAccept, isOpen, title, subtitle, acceptText, declineText }) => {
  const theme = useTheme()

  return (
    <IssuanceDialog show={isOpen} onClose={onDecline} >
      <Container>
        <Message>
          <Title>
            {t`${title || 'Are you sure?'}`}
          </Title>
          {subtitle && (
            <MessageSubtitle>{subtitle}</MessageSubtitle>
          )}
        </Message>

        <FilledButton
          background={theme.launchpad.colors.primary}
          onClick={onAccept}
        >
          {t`${acceptText || 'Yes'}`}
        </FilledButton>
        <OutlineButton onClick={onDecline}>
          {t`${declineText || 'No'}`}
        </OutlineButton>
      </Container>
    </IssuanceDialog>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
  grid-template-columns: auto auto;
  grid-template-areas:
    'message message'
    'button button';
  place-content: center;
  gap: 2rem 1rem;
  padding: 2rem;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  margin-bottom: 27px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
