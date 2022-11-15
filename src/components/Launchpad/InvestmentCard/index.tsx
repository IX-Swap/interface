import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { useCheckKYC, useSetAllowOnlyAccredited, useToggleKYCModal } from 'state/launchpad/hooks'
import { InvestmentOffer, SaleStatus } from 'pages/Launchpad/utils'

import { Tooltip } from './Tooltip'
import { InvestmentStatusBadge } from './InvestmentStatusBadge'
import { InvestmentSaleStatusInfo } from './InvestmentSaleStatusInfo'

import { ReactComponent as InvestmentApprovedIcon } from 'assets/launchpad/svg/investment-approved-icon.svg'
import { ReactComponent as InvestmentMetaSeparator } from 'assets/launchpad/svg/investment-meta-separator.svg'
import { ReactComponent as LockIcon } from 'assets/launchpad/svg/lock-icon.svg'
import Portal from '@reach/portal'
import { KYCPrompt } from '../KYCPrompt'


interface Props {
  offer: InvestmentOffer
}

export const InvestmentCard: React.FC<Props> = ({ offer }) => {
  const checkKYC = useCheckKYC()

  const [showDetails, setShowDetails] = React.useState(false)
  const [showKYCModal, setShowKYCModal] = React.useState(false)

  const toggleShowDetails = React.useCallback(() => setShowDetails(state => !state), [])
  const toggleKYCModal = React.useCallback(() => setShowKYCModal(state => !state), [])

  const isClosed = React.useMemo(() => {
    return [SaleStatus.closedSuccesfully, SaleStatus.closedUnsuccessfully].includes(offer.sale.status)
  }, [offer])

  const stage = React.useMemo(() => {
    if (isClosed) {
      return { label: 'Fully Funded', color: '#1FBA66' }
    }
    
    const daysLeft =  moment(offer.sale.endsAt).diff(moment()).valueOf() / (24 * 60 * 60 * 1000)
    
    if (daysLeft > 60) {
      return { label: 'Register to Invest', color: '#FFFFFF' }
    }

    return { label: 'Closes Soon', color: '#FF6060' }
  }, [offer, isClosed])

  const saleStatus = React.useMemo(() => {
    if (isClosed) {
      return 'Closed'
    }

    return 'Public Sale'
  }, [offer, isClosed])

  const onClick = React.useCallback(() => {
    const canOpen = checkKYC(offer.allowOnlyAccredited)
    
    if (canOpen) {
      alert('KYC is present')
    } else {
      toggleKYCModal()
    }
  }, [checkKYC, toggleKYCModal])

  return (
    <>
      <InvestmentCardContainer>
        <InvestmentCardImage src={offer.image} />

        <InvestmentCardHeader>
          <InvestmentCardTagsContainer>
            <InvestmentStatusBadge label={stage.label} color={stage.color} />
            <InvestmentStatusBadge label={saleStatus} color="rgba(41, 41, 51, 0.2)" />
          </InvestmentCardTagsContainer>
        </InvestmentCardHeader>

        <InvestmentCardInfoWrapper>

        </InvestmentCardInfoWrapper>

        <InvestmentCardInfoContainer  expanded={showDetails}>
          <InvestmentCardIcon src={offer.icon} />

          <InvestmentCardMetaContainer>
            {offer.stage !== 'whitelist' && (
              <>
                <InvestmentApprovedIcon />
                <InvestmentMetaSeparator />
              </>
            )}

            <InvestmentCardMetaEntry>{offer.type}</InvestmentCardMetaEntry>
            <InvestmentMetaSeparator />

            <InvestmentCardMetaEntry>{offer.industry}</InvestmentCardMetaEntry>
            <InvestmentMetaSeparator />
          </InvestmentCardMetaContainer>

          <InvestmentCardDescriptionContainer onClick={toggleShowDetails}>
            <InvestmentCardTitle>{offer.title}</InvestmentCardTitle>
            <InvestmentCardDescription>{offer.description}</InvestmentCardDescription>

          </InvestmentCardDescriptionContainer>

          <InvestmentCardDetailsContainer show={showDetails}>
            {showDetails && (
              <>
                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Projected fundraise</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>{offer.details.projectedFundraise}</InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>

                <InvestmentCardDetailsSeparator />
                
                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Minimum Investment</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>{offer.details.minimumInvestment}</InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>
                
                <InvestmentCardDetailsSeparator />
                
                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Investment type</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>{offer.details.investmentType}</InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>
                
                <InvestmentCardDetailsSeparator />
                
                <InvestmentCardDetailsEntry>
                  <InvestmentCardDetailsEntryLabel>Issuer</InvestmentCardDetailsEntryLabel>
                  <InvestmentCardDetailsEntryValue>{offer.details.issuer}</InvestmentCardDetailsEntryValue>
                </InvestmentCardDetailsEntry>
              </>
            )}
          </InvestmentCardDetailsContainer>
          
          <InvestmentSaleStatusInfo 
            endsAt={offer.sale.endsAt}
            status={offer.sale.status}
            allowOnlyAccredited={offer.allowOnlyAccredited}
          />
          
          <InvestmentCardFooter>
            {!isClosed && !offer.allowOnlyAccredited && (
              <InvestButton type="button" onClick={onClick}>
                Invest
              </InvestButton>
            )}
            
            {!isClosed && offer.allowOnlyAccredited && (
              <InvestButton type="button" onClick={onClick}>
                <Tooltip 
                  title="Accredited investors only" 
                  body={<>To access this deal you have to be an accredited investor. <a href="#">How to get accredited</a></>}
                >
                  <LockIcon /> 
                </Tooltip>
                Invest
              </InvestButton>
            )}

            {isClosed && <InvestButton type="button" onClick={onClick}>Learn More</InvestButton>}
          </InvestmentCardFooter>
        </InvestmentCardInfoContainer>
      </InvestmentCardContainer>
      
      {showKYCModal && (
        <Portal>
          <KYCPrompt allowOnlyAccredited={offer.allowOnlyAccredited} />
        </Portal>
      )}
    </>
  )
}


const InvestmentCardContainer = styled.article`
  position: relative;

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: stretch;

  width: 380px;

  overflow: hidden;
`

const InvestmentCardHeader = styled.header`
  position: relative;
`

const InvestmentCardFooter = styled.footer`
  z-index: 20;
`

const InvestmentCardImage = styled.img`
  position: absolute;

  top: 0;
  left: 0;
  
  height: 295px;

  border-radius: 6px;
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
  background: ${props => props.theme.launchpad.colors.background};
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
  font-style: normal;
  font-weight: 700;
  font-size: 20px;

  line-height: 140%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.text.title};
`
const InvestmentCardDescription = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`

const InvestmentCardDetailsContainer = styled.div<{ show: boolean }>`
  opacity: ${props => props.show ? '1' : '0'};
  height: ${props => props.show ? '170px' : '0'};
  
  transition: height 0.3s ease-in-out, opacity 0.2s ease-out 0.1s;

  z-index: 10;

  ${props => props.show && `margin: 0.5rem -1.5rem;`}

  border-top: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-bottom: 1px solid ${props => props.theme.launchpad.colors.border.default};

  width: 380px;
`
const InvestmentCardDetailsEntry = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  padding: 0 1.5rem;

`
const InvestmentCardDetailsSeparator = styled.hr`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  opacity: 0.8;

  margin: 0;
`

const InvestmentCardDetailsEntryLabel = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;

  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
`

const InvestmentCardDetailsEntryValue = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  
  line-height: 40px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};
`


const InvestmentCardMetaContainer = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.5rem;

  margin-bottom: 1rem;
`

const InvestmentCardMetaEntry = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const InvestButton = styled.button`
  display: flex;
  flex-flow: row nowrap;

  justify-content: center;
  align-items: center;

  gap: 0.5rem;

  background: ${props => props.theme.launchpad.colors.background};
  color: ${props => props.theme.launchpad.colors.primary};
  border: 1px solid ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;

  padding: 0.75rem;

  cursor: pointer;

  width: 100%;

  text-align: center;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;
`

