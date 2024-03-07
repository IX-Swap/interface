import { Trans, t } from '@lingui/macro'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import styled, { useTheme } from 'styled-components'

import { Message, MessageSubtitle } from 'components/LaunchpadIssuance/IssuanceForm/shared/PopUps/message'
import { TextAreaInner } from 'components/LaunchpadIssuance/utils/TextAreaInner'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { ButtonRow } from 'components/Row'
import { textFilter } from 'utils/input'
import { FormField } from '../IssuanceForm/shared/fields/FormField'
import React, { useState } from 'react'

interface Props {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
  title?: string
  subtitle?: string
  acceptText?: string
  declineText?: string
  reason: string
  setReason: (arg: string) => void
  message: string
  setMessage: (arg: string) => void
}

export const RequestChangesPopup = ({
  onDecline,
  onAccept,
  isOpen,
  title,
  subtitle,
  acceptText,
  declineText,
  reason,
  message,
  setReason,
  setMessage,
}: Props) => {
  const theme = useTheme()
  const [reasonError, setReasonError] = useState('')
  const [messageError, setMessageError] = useState('')

  const onChangeMessage = (value: string) => {
    setMessage(value)
    if (!value) setMessageError('Required')
    else if (value.length > 1000) setMessageError('Message must be shorter than or equal to 1000 characters')
    else setMessageError('')
  }

  return (
    <IssuanceDialog show={isOpen} onClose={onDecline} width="480px">
      <Container>
        <UpdateMessage>
          <Title>
            <Trans>{`${title || 'Are you sure?'}`}</Trans>
          </Title>
          {subtitle && <MessageSubtitle>{subtitle}</MessageSubtitle>}
        </UpdateMessage>
        <FormField
          label="Reason"
          placeholder="Write here"
          field="reason"
          setter={(field, value) => {
            setReason(value)
            setReasonError(value ? '' : 'Required')
          }}
          value={reason}
          error={reasonError}
          inputFilter={textFilter}
        />
        <TextAreaInner
          label="Message"
          field="message"
          setter={(field, value) => {
            onChangeMessage(value)
          }}
          span={3}
          value={message}
          error={messageError}
        />
        <ButtonRow>
          <OutlineButton style={{ border: '1px solid #6666FF33' }} width="200px" onClick={onDecline}>
            <Trans>{`${declineText || 'No'}`}</Trans>
          </OutlineButton>

          <FilledButton
            width="200px"
            background={theme.launchpad.colors.primary}
            disabled={!message || !reason || !!messageError}
            onClick={onAccept}
          >
            <Trans>{`${acceptText || 'Yes'}`}</Trans>
          </FilledButton>
        </ButtonRow>
      </Container>
    </IssuanceDialog>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  place-content: flex-start;
  gap: 1rem;
  padding: 2rem;
`
const Title = styled.div`
  font-weight: 600;
  font-size: 22px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${(props) => props.theme.launchpad.colors.text.title};
`
const UpdateMessage = styled(Message)`
  align-items: flex-start;
`
