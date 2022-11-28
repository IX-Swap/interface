import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'

interface Props {
  offer: Offer
}

export const OfferOverview: React.FC<Props> = (props) => {
  return (
    <OverviewContainer>
      <OverviewTitle>Overview</OverviewTitle>
      <OverviewContent>{props.offer.longDescription}</OverviewContent>
    </OverviewContainer>
  )
}

const OverviewContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;

  gap: 2rem;
  margin: 2rem 0;
`

const OverviewTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const OverviewContent = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 160%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`