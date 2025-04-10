import React from 'react'
import styled, { useTheme } from 'styled-components'
import { useHistory } from 'react-router-dom'

import { OFFER_STAGE_LABELS } from 'state/launchpad/constants'
import { OfferStatus } from 'state/launchpad/types'
import { Tooltip } from './Tooltip'
import { InvestmentStatusBadge } from './InvestmentStatusBadge'
import { InvestmentSaleStatusInfo } from './InvestmentSaleStatusInfo'
import { ReactComponent as LockIcon } from 'assets/launchpad/svg/lock-icon.svg'
import { InvestmentTypeInfo } from './InvestmentTypeInfo'
import { text1, text2, text4, text5, text58 } from 'components/LaunchpadMisc/typography'
import { PreviewModal } from './PreviewModal'
import { formatNumberWithDecimals } from 'state/lbp/hooks'
import { NETWORK_LOGOS } from 'constants/chains'
import { PinnedContentButton } from 'components/Button'
import { MEDIA_WIDTHS } from 'theme'
import { RaisedFund } from './RaisedFund'
import { getPublicAssetUrl } from 'components/TokenLogo/utils'

interface Props {
  offer: any
}

const getStageLabel = (stage: OfferStatus) => {
  return OFFER_STAGE_LABELS.find((x) => x.value === stage)?.label ?? ''
}

export const InvestmentCard: React.FC<Props> = ({ offer }) => {
  const history = useHistory()
  const theme = useTheme()

  const [showDetails, setShowDetails] = React.useState(false)
  const [isModalOpen, handleIsModalOpen] = React.useState(false)

  const toggleShowDetails = React.useCallback(() => setShowDetails((state) => !state), [])

  const network = offer?.network ?? ''
  const networkLogo = network ? NETWORK_LOGOS[network] : ''

  const isClosed = React.useMemo(
    () => !!offer.status && [OfferStatus.closed, OfferStatus.claim].includes(offer.status),
    [offer?.status]
  )
  const stage = React.useMemo(() => {
    if (offer?.hardCapReached) {
      return { label: 'Funded', color: '#1FBA66' }
    }

    if (offer?.closesSoon) {
      return { label: 'Closes soon', color: theme.launchpad.colors.text.error }
    }

    return null
  }, [offer])

  const onClick = () => {
    history.push(`/offers/${offer.id}`)
  }

  const closeModal = () => handleIsModalOpen(false)

  function capitalizeFirstLetter(offerType: string) {
    return offerType.charAt(0).toUpperCase() + offerType.slice(1)
  }

  return (
    <>
      <PreviewModal offer={offer} isModalOpen={isModalOpen} closeModal={closeModal} />
      <InvestmentCardContainer>
        <InvestmentCardImage src={getPublicAssetUrl(offer.cardPicture)} />

        <InvestmentCardHeader>
          <InvestmentCardTagsContainer>
            {stage && <InvestmentStatusBadge label={stage.label} color={stage.color} />}

            <InvestmentStatusBadge label={getStageLabel(offer.status)} color="rgba(41, 41, 51, 0.2)" />
          </InvestmentCardTagsContainer>
        </InvestmentCardHeader>

        <InvestmentCardInfoWrapper></InvestmentCardInfoWrapper>

        <InvestmentCardInfoContainer expanded={showDetails}>
          <InvestmentCardIcon src={getPublicAssetUrl(offer.profilePicture)} />

          {networkLogo ? (
            <LogoWrap>
              <NetworkLogo src={networkLogo} alt="network logo" />
            </LogoWrap>
          ) : null}

          <InvestmentTypeInfo industry={offer.industry} type={offer.type} status={offer.status} />

          <InvestmentCardDescriptionContainer onClick={toggleShowDetails}>
            <InvestmentCardTitle>{offer.title}</InvestmentCardTitle>
            <InvestmentCardDescription>{offer.shortDescription}</InvestmentCardDescription>
          </InvestmentCardDescriptionContainer>

          <InvestmentCardDetailsContainer show={showDetails}>
            {showDetails && (
              <>
                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Projected Fundraise</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>
                    {formatNumberWithDecimals(offer.hardCap, 2, true)}
                  </InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>

                <InvestmentCardDetailsSeparator />

                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Minimum Investment</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>
                    {formatNumberWithDecimals(offer.minInvestment, 2, true)}
                  </InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>

                <InvestmentCardDetailsSeparator />

                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Investing Token</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>{offer.investingTokenSymbol}</InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>

                <InvestmentCardDetailsSeparator />

                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Investment Type</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>
                    {capitalizeFirstLetter(offer.investmentType)}
                  </InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>

                <InvestmentCardDetailsSeparator />
                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Issuer</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>{offer.issuerName}</InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>
              </>
            )}
          </InvestmentCardDetailsContainer>

          <RaisedFund totalInvestment={offer.totalInvestment} symbol={offer?.investingTokenSymbol} />

          <InvestmentSaleStatusInfo
            isClosed={isClosed}
            isSuccesfull={offer.softCapReached}
            daysTillClosed={offer.daysTillClosed}
            hoursTillClosed={offer.hoursTillClosed}
            allowOnlyAccredited={offer.allowOnlyAccredited}
          />

          <InvestmentCardFooter>
            {!isClosed && !offer.allowOnlyAccredited && (
              <PinnedContentButton type="button" onClick={onClick}>
                Invest
              </PinnedContentButton>
            )}

            {!isClosed && offer.allowOnlyAccredited && (
              <InvestButton style={{ height: '51px' }} type="button" onClick={onClick}>
                <Tooltip
                  title="Accredited investors only"
                  body={
                    <>
                      You have to be an accredited investor (AI) to access this deal. <a href="#">Learn more.</a>
                    </>
                  }
                >
                  <LockIcon />
                </Tooltip>
                Invest
              </InvestButton>
            )}

            {isClosed && (
              <InvestButton style={{ height: '51px' }} type="button" onClick={onClick}>
                Learn More
              </InvestButton>
            )}
          </InvestmentCardFooter>
        </InvestmentCardInfoContainer>
      </InvestmentCardContainer>
    </>
  )
}

const InvestmentCardContainer = styled.article`
  position: relative;
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  border-radius: 6px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  width: 380px;
  overflow: hidden;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`

const InvestmentCardHeader = styled.header`
  position: relative;
`

const InvestmentCardFooter = styled.footer`
  // z-index: 20;
`

const InvestmentCardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 380px;
  overflow-x: hidden;
  border-radius: 6px;
  height: 300px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`

const InvestmentCardTagsContainer = styled.header`
  position: absolute;
  top: 1rem;
  left: 1rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`

const InvestmentCardInfoWrapper = styled.main`
  position: relative;
  margin-top: 295px;
  min-height: 270px;
`

const InvestmentCardInfoContainer = styled.div<{ expanded: boolean }>`
  position: absolute;
  bottom: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;
  padding: 1rem 1.5rem;
  padding-top: 3rem;
  width: 100%;
  background: ${(props) => props.theme.launchpad.colors.background};
`

const InvestmentCardIcon = styled.img`
  position: absolute;
  top: -32px;
  left: 1rem;
  width: 64px;
  height: 64px;
  border-radius: 6px;
`

const InvestmentCardDescriptionContainer = styled.div`
  cursor: pointer;
`

const InvestmentCardTitle = styled.div`
  ${text58}
  font-family: ${(props) => props.theme.launchpad.font};

  color: ${(props) => props.theme.launchpad.colors.text.title};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`
const InvestmentCardDescription = styled.div`
  ${text4}
  font-family: ${(props) => props.theme.launchpad.font};
  color: ${(props) => props.theme.launchpad.colors.text.body};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`

const InvestmentCardDetailsContainer = styled.div<{ show: boolean }>`
  opacity: ${(props) => (props.show ? '1' : '0')};
  height: ${(props) => (props.show ? '200px' : '0')};
  transition: height 0.3s ease-in-out, opacity 0.2s ease-out 0.1s;
  ${(props) => props.show && `margin: 0.5rem -1.5rem;`}
  border-top: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  width: 380px;

  @media (max-width: ${MEDIA_WIDTHS.upToSmall}px) {
    width: 100%;
  }
`
const InvestmentCardDetailsEntry = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.5rem;
`
const InvestmentCardDetailsSeparator = styled.hr`
  border: 1px solid ${(props) => props.theme.launchpad.colors.border.default};
  opacity: 0.8;
  margin: 0;
`

const InvestmentCardDetailsEntryLabel = styled.div`
  ${text5}
  color: ${(props) => props.theme.launchpad.colors.text.body};
`

const InvestmentCardDetailsEntryValue = styled.div`
  ${text2}
  color: ${(props) => props.theme.launchpad.colors.text.title};
`

const InvestButton = styled.button`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  background: ${(props) => props.theme.launchpad.colors.background};
  color: ${(props) => props.theme.launchpad.colors.primary};
  border: 1px solid ${(props) => props.theme.launchpad.colors.primary};
  border-radius: 6px;
  padding: 0.75rem;
  cursor: pointer;
  width: 100%;
  text-align: center;
  font-family: ${(props) => props.theme.launchpad.font};
  ${text1}
`

const LogoWrap = styled.div`
  position: absolute;
  top: 20px;
  right: 1rem;
  z-index: 10;
`

export const NetworkLogo = styled.img`
  height: 32px;
  width: 32px;
`
