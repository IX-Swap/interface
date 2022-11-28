import React from 'react'
import styled from 'styled-components'

import { useParams } from 'react-router-dom'

import { Header } from 'pages/Launchpad/Header'
import { Footer } from 'pages/Launchpad/Footer'

import Loader from 'components/Loader'

import { Offer } from 'state/launchpad/types'
import { useGetOffer } from 'state/launchpad/hooks'
import { useSetHideHeader } from 'state/application/hooks'

import { OfferSummary } from 'components/LaunchpadOffer/OfferSummary'
import { OfferMainInfo } from 'components/LaunchpadOffer/OfferMainInfo'
import { OfferSidebar } from 'components/LaunchpadOffer/OfferSidebar'



interface OfferPageParams {
  offerId: string
}

export default function LaunchpadOffer() {
  const params = useParams<OfferPageParams>()
  
  const getOffer = useGetOffer()
  const hideHeader = useSetHideHeader()

  const [loading, setLoading] = React.useState(true)
  const [offer, setOffer] = React.useState<Offer>()
  

  React.useEffect(() => {
    getOffer(params.offerId).then(setOffer).finally(() => setLoading(false))
  }, [])


  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])

  if (loading) {
    return <Centered><Loader size='40px' /></Centered>
  }

  if (!offer) {
    return <div>Not found</div>
  }

  return (
    <OfferBackgroundWrapper>
      <OfferContainer>
        <header>
          <Header />
        </header>

        <section>
          <OfferSummary offer={offer} />
        </section>

        <main>
          <OfferMainInfo offer={offer} />
        </main>

        <aside>
          <OfferSidebar offer={offer} />
        </aside>

        <footer>
          <Footer offerId={params.offerId} />
        </footer>
      </OfferContainer>
    </OfferBackgroundWrapper>
  )
}

const OfferBackgroundWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  font-family: ${props => props.theme.launchpad.font};
  background: ${props => props.theme.launchpad.colors.background};
`

const Centered = styled(OfferBackgroundWrapper)`
  display: grid;
  place-content: center;
`


const OfferContainer = styled.article`
  display: grid;

  grid-template-columns: 1fr minmax(auto, 800px) 380px 1fr;
  grid-template-rows: 80px auto auto auto;

  grid-template-areas: 
    "header header header header"
    ". summary . ."
    ". main sidebar ."
    "footer footer footer footer";

  gap: 2rem 4rem;
  
  main, aside {
    display: flex;

    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    gap: 2rem;
  }

  main {
    grid-area: main;
  }

  section {
    grid-area: summary;
  }

  aside {
    grid-area: sidebar;
  }

  header {
    grid-area: header;
  }

  footer {
    grid-area: footer;
  }
`
