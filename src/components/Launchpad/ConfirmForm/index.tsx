import React from 'react'
import styled, { useTheme } from 'styled-components'

// import { Check } from 'react-feather'
import { ReactComponent as Check } from '../../../assets/images/newCheckLogo.svg'
import { IssuanceDialog } from 'components/LaunchpadIssuance/utils/Dialog'
import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { text3, text50 } from 'components/LaunchpadMisc/typography'

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
          <Check />
        </Icon>

        <Message>
          <MessageTitle>Are you sure</MessageTitle>

          <MessageSubtitle>Would you like to submit this form?</MessageSubtitle>
        </Message>

        <OutlineButton style={{ border: 'border: 1px solid #6666FF33' }} onClick={props.onClose}>
    No
        </OutlineButton>

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
    'icon icon icon'
    'message message message'
    '. . .';

  place-content: center;

  gap: 2rem 1rem;
  // padding: 2rem;
`

const Icon = styled.div`
  grid-area: icon;

  place-self: end;

  margin: auto;

  display: grid;
  place-content: center;

  width: 100px;
  height: 100px;

  // border: 1px solid ${(props) => props.theme.launchpad.colors.success + '33'};
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
  ${text50}
  text-align: center;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const MessageSubtitle = styled.div`
  ${text3}
  text-align: center;
  max-width: 80%;
  color: ${(props) => props.theme.launchpad.colors.text.body};
`
