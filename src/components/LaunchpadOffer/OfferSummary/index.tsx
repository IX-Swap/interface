import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'

import { InvestmentTypeInfo } from 'components/Launchpad/InvestmentCard/InvestmentTypeInfo'
import { text12, text52 } from 'components/LaunchpadMisc/typography'

interface Props {
  offer: Offer
}

export const OfferSummary: React.FC<Props> = (props) => {
  return (
    <SummaryContainer>
      <TitleRow>
        <ProfilePicture src={props.offer.profilePicture.public} />
        <SummaryTitle>{props.offer.title}</SummaryTitle>
      </TitleRow>

      <SummaryDescription>{props.offer.shortDescription}</SummaryDescription>

      <InvestmentTypeInfo industry={props.offer.industry} type={props.offer.type} status={props.offer.status} />
    </SummaryContainer>
  )
}

const SummaryContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  gap: 1rem;
`

const SummaryTitle = styled.div`
  ${text52}
  color: ${(props) => props.theme.launchpad.colors.text.title};
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
