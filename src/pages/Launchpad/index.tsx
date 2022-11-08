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


export default function Launchpad() {
  const hideHeader = useSetHideHeader()

  const [offers, setOffers] = React.useState<InvestmentOffer[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)

  const pinnedOffer = React.useMemo(() => offers.find(offer => offer.pinned)!, [offers])
  const mainOfferList = React.useMemo(() => offers.filter(offer => !offer.pinned), [offers])

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
      <InvestmentList offers={mainOfferList} />
      <Footer />
    </LaunchpadContainer>
  )
}

const LaunchpadContainer = styled.div`
  padding: 0 4rem;

  font-family: ${props => props.theme.launchpad.font};
  background: ${props => props.theme.launchpad.colors.background};
`
