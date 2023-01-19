import React from 'react'
import styled from 'styled-components'

import { useHistory } from 'react-router-dom'
import { useGetOffer } from 'state/launchpad/hooks'

import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { LoaderContainer } from 'components/LaunchpadMisc/styled'

import { OfferStage } from 'components/LaunchpadOffer/OfferSidebar/OfferStage'
import { OfferTerms } from 'components/LaunchpadOffer/OfferSidebar/OfferTerms'
import { OfferContact } from 'components/LaunchpadOffer/OfferSidebar/OfferContact'
import { OfferGeneralInfo } from 'components/LaunchpadOffer/OfferSidebar/OfferDetails'
import { OfferAdditionalDocs } from 'components/LaunchpadOffer/OfferSidebar/OfferAdditionalDocs'
import { OfferPreSaleInfo, OfferSaleAllocation } from 'components/LaunchpadOffer/OfferSidebar/OfferSaleAllocation'

export const OfferReview: React.FC = (props) => {
  const history = useHistory()

  const id = React.useMemo(() => {
    return decodeURI(history.location.search).replace('?', '').split('&')
      .map(x => x.split('='))
      .map(([key, value]) => ({ key, value }))
      .find(x => x.key === 'id')
      ?.value
  }, [history.location.search])

  const offer = useGetOffer(id)

  if (offer.loading) {
    return (
      <LoaderContainer width="100vw" height="100vh">
        <Loader />
      </LoaderContainer>
    )
  }

  if (!offer.data) {
    return null
  }

  return (
    <ReviewContainer>
      <Sidebar></Sidebar>

      <Title>Review</Title>
      
      <Container area="stages">
        <OfferStage offer={offer.data} />
      </Container>

      <Container area="company-information">
        <OfferGeneralInfo offer={offer.data} />
      </Container>


      <Container area="total-funding-size">
        <OfferSaleAllocation offer={offer.data} borderless />
      </Container>

      <Container area="presale-size">
        <OfferPreSaleInfo offer={offer.data} borderless />
      </Container>
      
      <Container area="terms">
        <OfferTerms offer={offer.data} />
      </Container>
      <Container area="additional-documents">
        <OfferAdditionalDocs files={offer.data.files} />
      </Container>
      <Container area="contact">
        <OfferContact offer={offer.data} />
      </Container>
    </ReviewContainer>
  )
}

const ReviewContainer = styled.div`
  display: grid;

  grid-template-columns: 3fr 3fr 2fr;
  grid-template-rows: repeat(5, auto);
  grid-template-areas:
    "title title title"
    "stages company-information sidebar"
    "total-funding-size presale-size sidebar"
    "terms additional-documents sidebar"
    "terms contact .";

  gap: 1.25rem;

  max-width: 1180px;

  margin: 2.5rem auto;
`

const Title = styled.div`
  grid-area: title;

  font-style: normal;
  font-weight: 800;
  font-size: 32px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`

const Sidebar = styled.aside`
  grid-area: sidebar;

  padding: 1.5rem 2rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`

const Container = styled.div<{ area: string }>`
  grid-area: ${props => props.area};

  padding: 1.5rem 2rem;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
`
