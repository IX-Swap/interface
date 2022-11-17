import React from 'react'
import styled from 'styled-components'

import { InvestmentCard } from '../InvestmentCard'
import { getLaunchpadOffers, InvestmentOffer } from 'pages/Launchpad/utils'
import { FilterConfig, InvestmentListFilter } from './FIlter'
import { PaginationTrigger } from './PaginationTrigger'


export const InvestmentList: React.FC = () => {
  const [offers, setOffers] = React.useState<InvestmentOffer[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [filter, setFilter] = React.useState<FilterConfig | null>(null)

  const isSelected = React.useCallback((offer: InvestmentOffer) => {
    return !offer.pinned &&
      (!filter ||
        (filter.industry.length === 0 || filter.industry.find(x => x.value === offer.industry)) &&
        (filter.stage.length === 0 || filter.stage.find(x => x.value === offer.stage)) &&
        (filter.type.length === 0 || filter.stage.find(x => x.value === offer.type))
      )
  }, [filter])

  const mainOfferList = React.useMemo(() => offers.filter(offer => !offer.pinned && isSelected(offer)), [offers, isSelected])
  
  React.useEffect(() => {
    getLaunchpadOffers().then(setOffers).then(() => setLoading(false))
  }, [])
  
  const fetchMore = React.useCallback(() => {
    if (offers.length > 20) {
      return
    }

    setTimeout(() => {
      getLaunchpadOffers().then(offers => setOffers(state => state.concat(offers)))
    }, 300)
  }, [offers])

  return (
    <InvestmentListContainer>
      <InvestmentTitle>Investments</InvestmentTitle>
      <InvestmentListFilter onFilter={setFilter}/>
      <InvestmentListGrid>
        {mainOfferList.map(offer => <InvestmentCard key={offer.id} offer={offer} />)}
      </InvestmentListGrid>

      <PaginationTrigger onTriggered={fetchMore} />
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

  color: ${props => props.theme.launchpad.colors.text.title};
`


const InvestmentListGrid = styled.div`
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(380px, auto));
  grid-template-rows: repeat(2, auto);

  gap: 1rem;

  place-content: center;
`
