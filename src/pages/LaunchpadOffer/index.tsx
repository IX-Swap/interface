import React from 'react'
import styled from 'styled-components'
import Portal from '@reach/portal'

import { useHistory, useParams } from 'react-router-dom'

import { useActiveWeb3React } from 'hooks/web3'

import { Header } from 'pages/Launchpad/Header'
import { Footer } from 'pages/Launchpad/Footer'

import { OfferStatus } from 'state/launchpad/types'
import { useCheckKYC, useGetOffer } from 'state/launchpad/hooks'
import { useSetHideHeader } from 'state/application/hooks'

import { OfferSummary } from 'components/LaunchpadOffer/OfferSummary'
import { OfferMainInfo } from 'components/LaunchpadOffer/OfferMainInfo'
import { OfferSidebar } from 'components/LaunchpadOffer/OfferSidebar'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { CenteredFixed } from 'components/LaunchpadMisc/styled'
import { NetworkNotAvailable } from 'components/Launchpad/NetworkNotAvailable'

import { TGE_CHAINS_WITH_STAKING, SUPPORTED_TGE_CHAINS } from 'constants/addresses'
import { KYCPrompt } from 'components/Launchpad/KYCPrompt'
import { BackToTopButton } from 'components/LaunchpadMisc/BackToTopButton'

interface OfferPageParams {
  offerId: string
}

export default function LaunchpadOffer() {
  const history = useHistory()
  const params = useParams<OfferPageParams>()

  const offer = useGetOffer(params.offerId)
  const hideHeader = useSetHideHeader()
  const checkKYC = useCheckKYC()

  const [isAllowed, setIsAllowed] = React.useState<boolean>()

  const { chainId, account } = useActiveWeb3React()

  React.useEffect(() => {
    if (offer.data) {
      setIsAllowed(checkKYC(offer.data.allowOnlyAccredited, offer.data.status === OfferStatus.closed))
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

  if (offer.loading) {
    return (
      <Centered>
        <Loader />
      </Centered>
    )
  }

  if (!offer.data) {
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
          offerId={offer.data.id}
          allowOnlyAccredited={offer.data.allowOnlyAccredited}
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
          <OfferSummary offer={offer.data} />
        </section>

        <main>
          <OfferMainInfo offer={offer.data} />
          <BackToTopButton />
        </main>

        <aside>
          <OfferSidebar offer={offer.data} />
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
  font-family: ${(props) => props.theme.launchpad.font};
  background: ${(props) => props.theme.launchpad.colors.background};
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
    'header header header header'
    '. summary . .'
    '. main sidebar .'
    'footer footer footer footer';

  gap: 2rem 4rem;

  > main,
  > aside {
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
