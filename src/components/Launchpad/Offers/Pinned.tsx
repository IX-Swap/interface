import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'
import { isMobile } from 'react-device-detect'

import { Offer, OfferStatus } from 'state/launchpad/types'
import { OFFER_STAGE_LABELS } from 'state/launchpad/constants'
import { useGetPinnedOffer } from 'state/launchpad/hooks'
import { InvestmentStatusBadge } from 'components/Launchpad/InvestmentCard/InvestmentStatusBadge'
import { Loader } from 'components/LaunchpadOffer/util/Loader'
import { Centered } from 'components/LaunchpadMisc/styled'
import { InvestmentTypeInfo } from '../InvestmentCard/InvestmentTypeInfo'
import { text1, text12, text54, text59 } from 'components/LaunchpadMisc/typography'
import { MEDIA_WIDTHS } from 'theme'

const getStageLabel = (stage: OfferStatus) => {
  return OFFER_STAGE_LABELS.find((x) => x.value === stage)?.label ?? ''
}

export const Pinned: React.FC = () => {
  const history = useHistory()
  const getPinnedOffer = useGetPinnedOffer()
  const theme = useTheme()

  const [offer, setOffer] = React.useState<Offer>()
  const [loading, setLoading] = React.useState(true)

  const isClosed = React.useMemo(
    () => !!offer?.status && [OfferStatus.closed, OfferStatus.claim].includes(offer?.status),
    [offer?.status]
  )

  React.useEffect(() => {
    getPinnedOffer()
      .then(setOffer)
      .finally(() => setLoading(false))
  }, [])

  const onClick = () => {
    history.push(`/offers/${offer?.id ?? ''}`)
  }

  const stage = React.useMemo(() => {
    if (offer?.hardCapReached) {
      return { label: 'Funded', color: '#1FBA66' }
    }

    if (offer?.closesSoon) {
      return { label: 'Closes soon', color: theme.launchpad.colors.text.error }
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
    return (
      <>
        <PinnedWrapper style={{ margin: '0px', padding: '0px' }}>
          <PinnedContainer></PinnedContainer>
        </PinnedWrapper>
      </>
    )
  }

  return (
    <PinnedWrapper>
      <PinnedContainer>
        <PinnedImageContainer>
          <PinnedImage src={offer.cardPicture.public} />
          <PinnedTags>
            {stage && <InvestmentStatusBadge label={stage.label} color={stage.color} />}
            {offer.status !== OfferStatus.claim && (
              <InvestmentStatusBadge label={getStageLabel(offer.status)} color="rgba(41, 41, 51, 0.2)" />
            )}
          </PinnedTags>
        </PinnedImageContainer>

        <PinnedContent>
          {!isMobile && <InvestmentTypeInfo industry={offer.industry} type={offer.type} status={offer.status} />}

          <PinnedContentTitle>{offer.title}</PinnedContentTitle>
          <PinnedContentBody>{offer.shortDescription}</PinnedContentBody>

          {isClosed ? <LearnMoreButton onClick={onClick}>Learn more</LearnMoreButton> : null}
          {!isClosed ? (
            <PinnedContentButton type="button" onClick={onClick}>
              Invest
            </PinnedContentButton>
          ) : null}
        </PinnedContent>
      </PinnedContainer>
    </PinnedWrapper>
  )
}

const PinnedWrapper = styled.div`
  background-color: #ffffff;
  padding: 3rem;
  width: auto;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
    padding: 1rem;
  }
`

const PinnedContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
  margin: 0 auto;
  max-width: ${(props) => props.theme.launchpad.content.maxWidth};

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`

const PinnedImageContainer = styled.div`
  position: relative;
  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`

const PinnedImage = styled.img`
  border-radius: 8px;
  max-height: 385px;
  width: 600px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`

const PinnedContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  max-width: 600px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    display: block;
  }
`

const PinnedContentTitle = styled.div`
  ${text54}
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.title};

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    ${text59}
    margin-top: 20px;
  }
`
const PinnedContentBody = styled.div`
  ${text12}
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.body};

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    margin-top: 14px;
    color: #666680;
    font-weight: 400;
    font-size: 13px;
  }
`

const PinnedContentButton = styled.button`
  color: ${(props) => props.theme.launchpad.colors.text.light};
  background-color: ${(props) => props.theme.launchpad.colors.primary};
  font-family: ${(props) => props.theme.launchpad.font};
  border-radius: 6px;
  text-align: center;
  padding: 0.75rem 3rem;
  border: unset;
  max-width: fit-content;
  cursor: pointer;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    min-width: 100%;
    margin-top: 16px;
    padding: 1rem 4rem;
  }
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
const LearnMoreButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  color: ${(props) => props.theme.launchpad.colors.primary};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  padding: 0.75rem 3rem;
  cursor: pointer;
  width: fix-content;
  text-align: center;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text1}
`
