import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import Portal from '@reach/portal'

import { useHistory } from 'react-router-dom'

import { Offer, OfferStatus } from 'state/launchpad/types'
import { OFFER_STAGE_LABELS } from 'state/launchpad/constants'
import { useGetPinnedOffer, useCheckKYC } from 'state/launchpad/hooks'


import { KYCPrompt } from '../KYCPrompt'
import { InvestmentStatusBadge } from 'components/Launchpad/InvestmentCard/InvestmentStatusBadge'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { InvestmentTypeInfo } from '../InvestmentCard/InvestmentTypeInfo'


const getStageLabel = (stage: OfferStatus) => {
  return OFFER_STAGE_LABELS.find(x => x.value === stage)!.label
}

export const Pinned: React.FC = (props) => {
  const history = useHistory()
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
      history.push(`/offers/${offer!.id}`)
    } else {
      toggleKYCModal()
    }
  }, [checkKYC, toggleKYCModal, offer])
  
  const stage = React.useMemo(() => {
    if (offer?.hardCapReached) {
      return { label: 'Funded', color: '#1FBA66' }
    }

    if (offer?.closesSoon) {
      return { label: 'Closes soon', color: '#FF6060' }
    }

    return null
  }, [offer])

  if (loading) {
    return (
      <Centered width="100%">
        <Loader />
      </Centered>
    )
  }

  if (!offer) {
    return null
  }

  return (
    <PinnedWrapper>
      <PinnedContainer>
        <PinnedImageContainer>
          <PinnedImage src={offer.cardPicture.public}/>
          <PinnedTags>
            {stage && (<InvestmentStatusBadge label={stage.label} color={stage.color} /> )}

            {offer.status !== OfferStatus.claim && (
              <InvestmentStatusBadge label={getStageLabel(offer.status)} color="rgba(41, 41, 51, 0.2)" />
            )}
          </PinnedTags>
        </PinnedImageContainer>

        <PinnedContent>
          <InvestmentTypeInfo industry={offer.industry} type={offer.type} status={offer.status} />
          
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

  gap: 0.5rem;

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

const PinnedTags = styled.header`
  position: absolute;
  top: 1rem;
  left: 1rem;

  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;
`
