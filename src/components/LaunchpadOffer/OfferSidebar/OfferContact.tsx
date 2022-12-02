import React from 'react'
import styled from 'styled-components'

import { Mail } from 'react-feather'

import { Offer } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'

interface Props {
  offer: Offer
}

export const OfferContact: React.FC<Props> = (props) => {
  const entries = React.useMemo(() => [
    { 
      label: (
        <ContactLine href={`mailto:${props.offer.contactUsEmail}`}>
          <Mail size="18" /> {props.offer.contactUsEmail}
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