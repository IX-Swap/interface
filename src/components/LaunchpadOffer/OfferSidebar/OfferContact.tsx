import React from 'react'
import styled from 'styled-components'

import { Mail } from 'react-feather'

import { Offer } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'

interface Props {
  email?: string
}

export const OfferContact: React.FC<Props> = (props) => {
  const entries = React.useMemo(() => [
    { 
      label: (
        <ContactLine href={props.email ? `mailto:${props.email}` : '#'}>
          <Mail size="18" /> {props.email}
        </ContactLine> 
      )
    }
  ], [])

  return <InfoList title="Contact Us" entries={entries} />
}

const ContactLine = styled.a`
  display: flex;
  align-items: center;

  color: ${props => props.theme.launchpad.colors.text.body};

  text-decoration: none;

  svg {
    margin-right: 0.5rem;
  }

  svg > * {
    stroke: ${props => props.theme.launchpad.colors.text.body};
  }
`