import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import Portal from '@reach/portal'

import { Offer, OfferStatus } from 'state/launchpad/types'
import { useGetPinnedOffer, useCheckKYC } from 'state/launchpad/hooks'

import Loader from 'components/Loader'
import { KYCPrompt } from '../KYCPrompt'

export const Pinned: React.FC = (props) => {
  const getPinnedOffer = useGetPinnedOffer()
  const checkKYC = useCheckKYC()

  const [offer, setOffer] = React.useState<Offer>()
  const [loading, setLoading] = React.useState(true)
  const [showKYCModal, setShowKYCModal] = React.useState(false)

  const toggleKYCModal = React.useCallback(() => setShowKYCModal(state => !state), [])

  React.useEffect(() => {
    getPinnedOffer().then(setOffer).finally(() => setLoading(false))
  }, [])

  const onClick = React.useCallback(() => {
    const canOpen = checkKYC(offer?.allowOnlyAccredited || false, offer?.status === OfferStatus.closed)
    
    if (canOpen) {
      alert('KYC is present')
    } else {
      toggleKYCModal()
    }
  }, [checkKYC, toggleKYCModal])

  if (loading) {
    return <Loader />
  }

  if (!offer) {
    return null
  }

  return (
    <PinnedWrapper>
      <PinnedContainer>
        <PinnedImageContainer>
          <PinnedImage src={offer.cardPicture.public}/>
          <PinnerCategory>{offer.industry}</PinnerCategory>
        </PinnedImageContainer>

        <PinnedContent>
          <PinnedContentDate>{moment(offer.createdAt).format('MMMM D, YYYY')}</PinnedContentDate>
          <PinnedContentTitle>{offer.title}</PinnedContentTitle>
          <PinnedContentBody>{offer.longDescription}</PinnedContentBody>
          <PinnedContentButton type="button" onClick={onClick}>Invest</PinnedContentButton>
        </PinnedContent>
      </PinnedContainer>

      {showKYCModal && (
        <Portal>
          <KYCPrompt offerId={offer.id} allowOnlyAccredited={offer.allowOnlyAccredited} />
        </Portal>
      )}

    </PinnedWrapper>
  )
}

const PinnedWrapper = styled.div`
  background-color: ${props => props.theme.launchpad.colors.foreground};

  padding: 2rem;
  margin: 2rem 0;
`

const PinnedContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 2rem;

  margin: 0 auto;
  max-width: ${props => props.theme.launchpad.content.maxWidth};
`

const PinnedImageContainer = styled.div`
  position: relative;
`

const PinnerCategory = styled.div`
  position: absolute;

  top: 1rem;
  right: 1rem;

  color: ${props => props.theme.launchpad.colors.text.light}
`

const PinnedImage = styled.img`
  border-radius: 8px;
  max-height: 385px;
`

const PinnedContent = styled.div`
  display: flex;

  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;

  gap: 1rem;

  max-width: 600px;
`

const PinnedContentDate = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const PinnedContentTitle = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 40px;

  line-height: 110%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
const PinnedContentBody = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 140%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`

const PinnedContentButton = styled.button`
  color: ${props => props.theme.launchpad.colors.text.light};
  background-color: ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;

  text-align: center;

  padding: 0.75rem 3rem;

  border: unset;

  max-width: fit-content;

  cursor: pointer;
`
