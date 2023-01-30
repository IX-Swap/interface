import React from 'react'
import styled from 'styled-components'

import { InvestmentCard } from '../InvestmentCard'
import { FilterConfig, InvestmentListFilter } from './Filter'
import { PaginationTrigger } from './PaginationTrigger'

import { Offer } from 'state/launchpad/types'

interface Props {
  offers: Offer[]
  
  hasMore: boolean
  isLoading?: boolean

  fetchMore: () => void
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

      {props.hasMore && <PaginationTrigger isLoading={props.isLoading} onTriggered={props.fetchMore} />}
    </InvestmentListContainer>
  )
}

const InvestmentListContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  max-width: ${props => props.theme.launchpad.content.maxWidth};

  margin: auto;

  @media (max-width: 1180px) {
    margin: 0 1rem;
  }
`

const InvestmentTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;
  
  font-family: ${props => props.theme.launchpad.font};

  color: ${props => props.theme.launchpad.colors.text.title};
`


const InvestmentListGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, 380px);
  grid-template-rows: repeat(2, auto);

  gap: 1rem;

  place-content: start;
`
