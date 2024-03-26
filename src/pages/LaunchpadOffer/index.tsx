import React from 'react'
import styled, { useTheme } from 'styled-components'
import Portal from '@reach/portal'

import { useHistory, useParams } from 'react-router-dom'

import { useActiveWeb3React } from 'hooks/web3'

// import { Header } from 'pages/Launchpad/Header'
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
import { FilledButton } from 'components/LaunchpadMisc/buttons'
import { DiscreteInternalLink, MEDIA_WIDTHS } from 'theme'
import { ArrowLeft } from 'react-feather'
import { routes } from 'utils/routes'
import Header from 'components/Header'
import { NotAvailablePage } from 'components/NotAvailablePage'

interface OfferPageParams {
  offerId: string
}

export default function LaunchpadOffer() {
  const theme = useTheme()
  const history = useHistory()
  const params = useParams<OfferPageParams>()

  const offer = useGetOffer(params.offerId)
  const hideHeader = useSetHideHeader()
  const checkKYC = useCheckKYC()

  const [isAllowed, setIsAllowed] = React.useState<boolean>()

  const { chainId, account } = useActiveWeb3React()

  React.useEffect(() => {
    if (offer.data) {
      if (offer && offer.data && offer.data.ethAddress) {
        setIsAllowed(
          checkKYC(
            offer.data.allowOnlyAccredited,
            [OfferStatus.closed, OfferStatus.claim].includes(offer.data.status)
          ) || account?.toLowerCase() === offer?.data?.ethAddress?.toLowerCase()
        )
      } else {
        setIsAllowed(
          checkKYC(offer.data.allowOnlyAccredited, [OfferStatus.closed, OfferStatus.claim].includes(offer.data.status))
        )
      }
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
    return (
      <Centered>
        <ErrorTitle>{offer.error || 'Offer not found'}</ErrorTitle>
      </Centered>
    )
  }

  if (blurred) {
    return (
      <Portal>
        <CenteredFixed width="100vw" height="100vh">
          <NotAvailablePage />
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
          onClose={() => history.push(routes.launchpad)}
        />
      </Portal>
    )
  }

  return (
    <OfferBackgroundWrapper>
      <OfferContainer>
        <div className="back-button">
          <BackButton as={DiscreteInternalLink} onClick={() => history.goBack()}>
            <ArrowLeft color={theme.launchpad.colors.primary} />
          </BackButton>
        </div>
        <header>
          <Header />
        </header>

        <section>
          <OfferSummary offer={offer.data} />
        </section>

        <main>
          <OfferMainInfo offer={offer.data} />
        </main>

        <aside>
          <OfferSidebar offer={offer.data} />
        </aside>

        <footer>
          <BackToTopButton />
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
  * {
    font-family: ${(props) => props.theme.launchpad.font};
  }
`

const Centered = styled(OfferBackgroundWrapper)`
  display: grid;
  place-content: center;
`

const ErrorTitle = styled.div`
  font-weight: 800;
  font-size: 32px;
  line-height: 120%;

  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const OfferContainer = styled.article`
  display: grid;

  grid-template-columns: 1fr minmax(auto, 800px) 380px 1fr;
  grid-template-rows: 80px auto auto auto;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }

  grid-template-areas:
    'header header header header'
    'back summary . .'
    '. main sidebar .'
    'footer footer footer footer';

  gap: 4rem 6rem;

  @media (max-width: 1440px) {
    grid-template-columns: 100px minmax(auto, 800px) 380px 8px;
  }

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

  .back-button {
    grid-area: back;
    display: flex;
    justify-content: flex-end;
  }
`

const BackButton = styled(FilledButton)`
  padding: 0;
  width: 48px;

  background: ${(props) => props.theme.launchpad.colors.background};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary + '14'};
  border-radius: 6px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-top: 80px;
    position: relative;
    right: 85%;
  }
`
