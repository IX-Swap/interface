import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'

import { InvestmentTypeInfo } from 'components/Launchpad/InvestmentCard/InvestmentTypeInfo'
import { text12, text52 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'
import { TokenLogo } from 'components/TokenLogo'

interface Props {
  offer: Offer
}

export const OfferSummary: React.FC<Props> = (props) => {
  return (
    <SummaryContainer>
      <TitleRow>
        <TokenLogo logo={props.offer.profilePicture} width="64px" height="64px" borderRadius="6px" />
        <SummaryTitle>{props.offer.title}</SummaryTitle>
      </TitleRow>

      <SummaryDescription>{props.offer.shortDescription}</SummaryDescription>

      <InvestmentTypeInfo industry={props.offer.industry} type={props.offer.type} status={props?.offer?.status} />
    </SummaryContainer>
  )
}

const SummaryContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin: 20px 20px 0px 20px;
  }
`

const SummaryTitle = styled.div`
  ${text52}
  color: ${(props) => props.theme.launchpad.colors.text.title};

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    font-size: 32px;
  }
`

const SummaryDescription = styled.div`
  ${text12}
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const TitleRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1.5rem;
`

const ProfilePicture = styled.img`
  width: 64px;
  height: 64px;
  border-radius: 6px;
`
