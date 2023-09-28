import React from 'react'
import styled, { useTheme } from 'styled-components'
import { t } from '@lingui/macro'

import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { Message, MessageSubtitle } from 'components/LaunchpadIssuance/IssuanceForm/shared/PopUps/message'
import { X as Delete, Check } from 'react-feather'
interface Props {
  isOpen: boolean
  onAccept: () => void
  onDecline: () => void
  title?: string
  subtitle?: any
  acceptText?: string
  declineText?: string
  type?: 'success' | 'error' | 'info'
  showIcon?: boolean
}

export const ConfirmPopup: React.FC<Props> = ({
  onDecline,
  onAccept,
  isOpen,
  title,
  subtitle,
  acceptText,
  declineText,
  type = 'info',
  showIcon = false,
}) => {
  const theme = useTheme()
  const background = type === 'info' ? theme.launchpad.colors.primary : theme.launchpad.colors[type]

  return (
    <IssuanceDialog show={isOpen} onClose={onDecline}>
      <Container>
        <Message>
          {showIcon && (
            <Icon>
              {type === 'success' && <Check color={theme.launchpad.colors.success} size="42" strokeWidth={1} />}
              {type === 'error' && <Delete color={theme.launchpad.colors.error} size="42" strokeWidth={1} />}
            </Icon>
          )}
          <Title>{t`${title || 'Are you sure?'}`}</Title>
          {subtitle && <MessageSubtitle>{subtitle}</MessageSubtitle>}
        </Message>

        <OutlineButton style={{ border: '1px solid #6666FF33' }} onClick={onDecline}>{t`${
          declineText || 'No'
        }`}</OutlineButton>

        <FilledButton background={background} onClick={onAccept}>
          {t`${acceptText || 'Yes'}`}
        </FilledButton>
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
