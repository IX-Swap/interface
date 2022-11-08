import React from 'react'
import styled from 'styled-components'

import { InvestmentCard } from '../InvestmentCard'
import { InvestmentOffer } from 'pages/Launchpad/utils'

interface Props {
  offers: InvestmentOffer[]
}

export const InvestmentList: React.FC<Props> = (props) => {
  return (
    <InvestmentListContainer>
      {props.offers.map(offer => <InvestmentCard key={offer.id} {...offer} />)}
    </InvestmentListContainer>
  )
}

const InvestmentListContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(2, auto);

  gap: 1rem;

  margin: auto;

  place-content: center;
`
