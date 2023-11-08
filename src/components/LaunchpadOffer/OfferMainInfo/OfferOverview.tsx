import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'
import { text33, text53 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'

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
  white-space: pre-line;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
   padding: 0px 20px;
  }
`

const OverviewTitle = styled.div`
  ${text53}

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const OverviewContent = styled.div`
  ${text33}

  color: ${(props) => props.theme.launchpad.colors.text.body};
`
