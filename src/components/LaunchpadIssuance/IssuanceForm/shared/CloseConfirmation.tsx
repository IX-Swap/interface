import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Save } from 'react-feather'

import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Message, MessageSubtitle, MessageTitle } from './PopUps/message'
import { text1 } from 'components/LaunchpadMisc/typography'

interface Props {
  isOpen: boolean
  onDiscard: () => void
  onClose: () => void
  onSave: () => void
}

export const CloseConfirmation: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <IssuanceDialog show={props.isOpen} onClose={props.onClose}>
      <Container>
        <Icon>
          <Save color={theme.launchpad.colors.error} size="42" strokeWidth={1} />
        </Icon>

        <Message>
          <MessageTitle>Unsaved Changes</MessageTitle>

          <MessageSubtitle>
            You are about to close this item with unsaved changes. Would you like to save these changes before closing?
          </MessageSubtitle>
        </Message>

        <OutlineButton padding="0 18px" color={theme.launchpad.colors.error} onClick={props.onDiscard}>
          <ButtonLabel>Discard changes</ButtonLabel>
        </OutlineButton>

        <OutlineButton padding="0 18px" onClick={props.onClose}>
          <ButtonLabel>Cancel</ButtonLabel>
        </OutlineButton>

        <FilledButton padding="0 18px" onClick={props.onSave}>
          <ButtonLabel>Save changes</ButtonLabel>
        </FilledButton>
      </Container>
    </IssuanceDialog>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 48px;
  grid-template-columns: repeat(3, 140px);
  grid-template-areas:
    'icon icon icon'
    'message message message'
    '. . .';
  place-content: center;
  gap: 2rem 1rem;
  padding: 2rem;
`

const Icon = styled.div`
  grid-area: icon;
  place-self: end;
  margin: auto;
  display: grid;
  place-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid ${(props) => props.theme.launchpad.colors.error + '33'};
  border-radius: 50%;
`

const ButtonLabel = styled.span`
  ${text1}
`
