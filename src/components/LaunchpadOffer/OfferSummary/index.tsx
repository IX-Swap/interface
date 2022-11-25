import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'

import { InvestmentTypeInfo } from 'components/Launchpad/InvestmentCard/InvestmentTypeInfo'

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
  font-style: normal;
  font-weight: 800;
  font-size: 64px;

  line-height: 110%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const SummaryDescription = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 140%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`


const TitleRow  = styled.div`
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
