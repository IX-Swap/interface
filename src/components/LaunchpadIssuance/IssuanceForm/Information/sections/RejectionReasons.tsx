import React from 'react'
import styled from 'styled-components'

import { Info } from 'react-feather'

import { FilledButton, OutlineButton } from 'components/LaunchpadMisc/buttons'
import { text1, text19, text22, text30 } from 'components/LaunchpadMisc/typography'

export const RejectionReasons = () => {
  return (
    <Container>
      <InfoIcon strokeWidth={1} />

      <Title>Reason for Rejection</Title>

      <Description>
        Sed porttitor lectus nibh. Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.
      </Description>

      <Reasons>
        <Reason>Last Name</Reason>
        <Reason>Gender</Reason>
        <Reason>Middle Name</Reason>
      </Reasons>

      <TryAgainButton>Try Again</TryAgainButton>
      <NewFormButton>New Form</NewFormButton>
      <ContactButton>Contact Support</ContactButton>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(5, auto);
  grid-template-areas:
    'title info'
    'description description'
    'reasons reasons'
    'try-again new-form'
    'contact contact';

  gap: 0.75rem;
  padding: 1rem 1.5rem;

  color: ${(props) => props.theme.launchpad.colors.error};

  border: 1px solid ${(props) => props.theme.launchpad.colors.error};
  border-radius: 6px;
`

const Title = styled.div`
  grid-area: title;
  ${text30}
  white-space: nowrap;
`

const Description = styled.div`
  grid-area: description;

  ${text19}

  color: #ff8282;
`

const Reasons = styled.ul`
  grid-area: reasons;
`
const Reason = styled.li`
  ${text22}
`

const TryAgainButton = styled(FilledButton)`
  grid-area: try-again;
  ${text1}
  color: ${(props) => props.theme.launchpad.colors.text.light};
  background: ${(props) => props.theme.launchpad.colors.error};
`

const NewFormButton = styled(OutlineButton)`
  grid-area: new-form;

  ${text1}
  padding: 0;

  color: ${(props) => props.theme.launchpad.colors.error};
  border: 1px solid ${(props) => props.theme.launchpad.colors.error + '33'};
`

const ContactButton = styled(NewFormButton)`
  grid-area: contact;
`

const InfoIcon = styled(Info)`
  grid-area: info;
  place-self: center end;
`
