import React from 'react'
import styled from 'styled-components'

import Loader from 'components/Loader'
import { InvestmentList } from 'components/Launchpad/InvestmentList'
import { useSetHideHeader } from 'state/application/hooks'

import { Banner } from './Banner'
import { Header } from './Header'
import { Footer } from './Footer'
import { Pinned } from './Pinned'

import { getLaunchpadOffers, getPinnedOffer, InvestmentOffer } from './utils'
import { FilterConfig } from 'components/Launchpad/InvestmentList/FIlter'
import { KYCPrompt } from 'components/Launchpad/KYCPrompt'


export default function Launchpad() {
  const hideHeader = useSetHideHeader()
  const [loading, setLoading] = React.useState(true)
  const [pinnedOffer, setPinnedOffer] = React.useState<InvestmentOffer | null>(null)

  React.useEffect(() => {
    getPinnedOffer().then(setPinnedOffer).then(() => setLoading(false))
  }, [])

  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])


  if (loading) {
    return <Loader />
  }

  return (
    <LaunchpadContainer>
      <Header />
      <Banner />
      <Pinned offer={pinnedOffer!} />
      <InvestmentList />
      <Footer />
    </LaunchpadContainer>
  )
}

const LaunchpadContainer = styled.div`
  padding: 0 4rem;

  font-family: ${props => props.theme.launchpad.font};
  background: ${props => props.theme.launchpad.colors.background};
`
