import React from 'react'
import styled, { useTheme } from 'styled-components'

import { X as Delete } from 'react-feather'

import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Centered } from 'components/LaunchpadMisc/styled'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Message, MessageSubtitle, MessageTitle } from 'components/LaunchpadIssuance/IssuanceForm/shared/PopUps/message'

interface Props {
  isOpen: boolean
  onDiscard: () => void
  onClose: () => void
  loading: boolean
}

export const ConfirmDeletePopup: React.FC<Props> = ({ loading, onClose, onDiscard, isOpen }) => {
  const theme = useTheme()

  return (
    <IssuanceDialog show={isOpen} onClose={onClose}>
      <Container>
        <Icon>
          <Delete color={theme.launchpad.colors.error} size="42" strokeWidth={1} />
        </Icon>

        <Message>
          <MessageTitle>Are you sure?</MessageTitle>

          <MessageSubtitle>You are about to delete this whitelisted wallet.</MessageSubtitle>
        </Message>

        {!loading && (
          <FilledButton
            color={theme.launchpad.colors.foreground}
            background={theme.launchpad.colors.error}
            onClick={onDiscard}
          >
            Delete
          </FilledButton>
        )}
        {loading && (
          <Centered>
            <Loader />
          </Centered>
        )}
        <OutlineButton onClick={onClose}>Cancel</OutlineButton>
      </Container>
    </IssuanceDialog>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: auto auto 50px;
  grid-template-columns: auto auto;
  grid-template-areas:
    'icon icon'
    'message message'
    'button button';
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
