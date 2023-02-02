import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Check } from 'react-feather'

import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'

interface Props {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export const ConfirmationForm: React.FC<Props> = (props) => {
  const theme = useTheme()

  const save = React.useCallback(() => {
    props.onSave()
    props.onClose()
  }, [props.onSave, props.onClose])

  return (
    <IssuanceDialog show={props.isOpen} onClose={props.onClose}>
      <Container>
        <Icon>
          <Check color={theme.launchpad.colors.success} size="42" strokeWidth={1}/>
        </Icon>

        <Message>
          <MessageTitle>
            Are you sure
          </MessageTitle>

          <MessageSubtitle>
            Would you like to submit this form?
          </MessageSubtitle>
        </Message>

        <OutlineButton onClick={props.onClose}>Cancel</OutlineButton>

        <FilledButton onClick={save}>Submit</FilledButton>
      </Container>
    </IssuanceDialog>
  )
}

const Container = styled.div`
  display: grid;

  grid-template-rows: auto auto 48px;
  grid-template-columns: repeat(2, 210px);
  grid-template-areas: 
    "icon icon icon"
    "message message message"
    ". . .";

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

  border: 1px solid ${props => props.theme.launchpad.colors.success + '33'};
  border-radius: 50%;
`

const Message = styled.div`
  grid-area: message;

  display: flex;
  flex-flow: column nowrap;
  align-items: center;

  gap: 0.5rem;
`

const MessageTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;

  line-height: 130%;
  letter-spacing: -0.03em;
  
  text-align: center;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const MessageSubtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 150%;
  letter-spacing: -0.02em;

  text-align: center;

  max-width: 80%;

  color: ${props => props.theme.launchpad.colors.text.body};
`
