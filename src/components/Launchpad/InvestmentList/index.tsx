import React from 'react'
import styled from 'styled-components'

import { InvestmentCard } from '../InvestmentCard'
import { InvestmentOffer } from 'pages/Launchpad/utils'
import { FilterConfig, InvestmentListFilter } from './FIlter'

interface Props {
  offers: InvestmentOffer[]
  onFilter: (filter: FilterConfig) => void
}

export const InvestmentList: React.FC<Props> = (props) => {
  return (
    <InvestmentListContainer>
      <InvestmentTitle>Investments</InvestmentTitle>
      <InvestmentListFilter onFilter={props.onFilter}/>
      <InvestmentListGrid>
        {props.offers.map(offer => <InvestmentCard key={offer.id} offer={offer} />)}
      </InvestmentListGrid>
    </InvestmentListContainer>
  )
}

const InvestmentListContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  width: fit-content;

  margin: auto;
`

const InvestmentTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`


const InvestmentListGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(3, auto);
  grid-template-rows: repeat(2, auto);

  gap: 1rem;

  place-content: center;
`
