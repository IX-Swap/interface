import React from 'react'
import styled from 'styled-components'

import Loader from 'components/Loader'
import { InvestmentList } from 'components/Launchpad/InvestmentList'
import { useSetHideHeader } from 'state/application/hooks'

import { Banner } from './Banner'
import { Header } from './Header'
import { Footer } from './Footer'
import { Pinned } from './Pinned'

import { getLaunchpadOffers, InvestmentOffer } from './utils'
import { FilterConfig } from 'components/Launchpad/InvestmentList/FIlter'
import { KYCPrompt } from 'components/Launchpad/KYCPrompt'


export default function Launchpad() {
  const hideHeader = useSetHideHeader()

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

  const pinnedOffer = React.useMemo(() => offers.find(offer => offer.pinned)!, [offers])
  const mainOfferList = React.useMemo(() => offers.filter(offer => !offer.pinned && isSelected(offer)), [offers, isSelected])

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  React.useEffect(() => {
    getLaunchpadOffers().then(setOffers).then(() => setLoading(false))
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <LaunchpadContainer>
      <Header />
      <Banner />
      <Pinned offer={pinnedOffer} />
      <InvestmentList offers={mainOfferList} onFilter={setFilter} />
      <Footer />

      <KYCPrompt />
    </LaunchpadContainer>
  )
}

const LaunchpadContainer = styled.div`
  padding: 0 4rem;

  font-family: ${props => props.theme.launchpad.font};
  background: ${props => props.theme.launchpad.colors.background};
`
