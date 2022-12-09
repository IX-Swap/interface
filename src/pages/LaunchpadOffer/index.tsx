import React from 'react'
import styled from 'styled-components'
import Portal from '@reach/portal'

import { useHistory, useParams } from 'react-router-dom'

import { useActiveWeb3React } from 'hooks/web3'

import { Header } from 'pages/Launchpad/Header'
import { Footer } from 'pages/Launchpad/Footer'

import { Offer, OfferStatus} from 'state/launchpad/types'
import { OFFER_RELATED_TIMEFRAMES } from 'state/launchpad/constants'
import { useCheckKYC, useGetOffer } from 'state/launchpad/hooks'
import { useSetHideHeader } from 'state/application/hooks'

import { OfferSummary } from 'components/LaunchpadOffer/OfferSummary'
import { OfferMainInfo } from 'components/LaunchpadOffer/OfferMainInfo'
import { OfferSidebar } from 'components/LaunchpadOffer/OfferSidebar'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { CenteredFixed } from 'components/LaunchpadOffer/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'

import { TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { KYCPrompt } from 'components/Launchpad/KYCPrompt'



interface OfferPageParams {
  offerId: string
}

export default function LaunchpadOffer() {
  const history = useHistory()
  const params = useParams<OfferPageParams>()
  
  const getOffer = useGetOffer()
  const hideHeader = useSetHideHeader()
  const checkKYC = useCheckKYC()

  const [offer, setOffer] = React.useState<Offer>()
  const [loading, setLoading] = React.useState(true)
  const [isAllowed, setIsAllowed] = React.useState<boolean>()
  
  const { library, chainId, account } = useActiveWeb3React()

  const updateTimeFrames = React.useCallback((data: Offer) => {

    data.timeframes.forEach(item => {
      const frame = data.timeframes.find(timeframe => timeframe.type === OFFER_RELATED_TIMEFRAMES[item.type])

      if (frame?.startDate) {
        item.endDate = frame.startDate
      }
    })

    return data
  }, [])

  React.useEffect(() => {
    getOffer(params.offerId).then((data)=> {      
      setOffer(updateTimeFrames(data))
    }).finally(() => setLoading(false))
  }, [params.offerId])

  React.useEffect(() => {
    if (offer) {
      setIsAllowed(checkKYC(offer.allowOnlyAccredited, offer.status === OfferStatus.closed))
    }
  }, [offer])


  React.useEffect(() => {
    hideHeader(true)

    return () => {
      hideHeader(false)
    }
  }, [])
  
  const blurred = React.useMemo(
    () => ![...TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS.MAIN].includes(chainId || 0), 
    [account, chainId]
  )
  
  if (loading) {
    return <Centered><Loader /></Centered>
  }

  if (!offer) {
    return <Centered>Not found</Centered>
  }

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NetworkNotAvailable />
        </CenteredFixed>
      </Portal>
    )
  }

  if (!isAllowed) {
    return (
      <Portal>
        <KYCPrompt 
          offerId={offer.id}
          allowOnlyAccredited={offer.allowOnlyAccredited}
          onClose={() => history.push('/launchpad')}
        />
      </Portal>
    )
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
  
  > main, > aside {
    display: flex;

    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    gap: 2rem;
  }

  > main {
    grid-area: main;
  }

  > section {
    grid-area: summary;
  }

  > aside {
    grid-area: sidebar;
  }

  > header {
    grid-area: header;
  }

  > footer {
    grid-area: footer;
  }
`
