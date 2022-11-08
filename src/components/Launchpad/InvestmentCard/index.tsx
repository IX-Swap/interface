import React from 'react'
import styled from 'styled-components'

import { ReactComponent as InvestmentApprovedIcon } from 'assets/launchpad/svg/investment-approved-icon.svg'
import { ReactComponent as InvestmentMetaSeparator } from 'assets/launchpad/svg/investment-meta-separator.svg'
import { InvestmentStatusBadge } from './InvestmentStatusBadge'

interface Props {
  title: string
  description: string

  type: string
  category: string

  icon: string
  image: string

  status: string
  saleStatus?: string

  details: {
    projectedFundraise: string
    minimumInvestment: string
    investmentType: string
    issuer: string
  }
}

export const InvestmentCard: React.FC<Props> = (props) => {
  const [showDetails, setShowDetails] = React.useState(false)

  const toggleShowDetails = React.useCallback(() => setShowDetails(state => !state), [])

  return (
    <InvestmentCardContainer>
      <InvestmentCardImage src={props.image} />

      <InvestmentCardHeader>
        <InvestmentCardTagsContainer>
          <InvestmentStatusBadge status={props.status} />
          <InvestmentStatusBadge status={props.saleStatus} />
        </InvestmentCardTagsContainer>
      </InvestmentCardHeader>

      <InvestmentCardInfoWrapper>

      </InvestmentCardInfoWrapper>
      <InvestmentCardInfoContainer onClick={toggleShowDetails} expanded={showDetails}>
        <InvestmentCardIcon src={props.icon} />

        <InvestmentCardMetaContainer>
          {props.status !== 'whitelist' && (
            <>
              <InvestmentApprovedIcon />
              <InvestmentMetaSeparator />
            </>
          )}

          <InvestmentCardMetaEntry>{props.type}</InvestmentCardMetaEntry>
          <InvestmentMetaSeparator />

          <InvestmentCardMetaEntry>{props.category}</InvestmentCardMetaEntry>
          <InvestmentMetaSeparator />
        </InvestmentCardMetaContainer>

        <InvestmentCardDescriptionContainer>
          <InvestmentCardTitle>{props.title}</InvestmentCardTitle>
          <InvestmentCardDescription>{props.description}</InvestmentCardDescription>
        </InvestmentCardDescriptionContainer>

        <InvestmentCardDetailsContainer show={showDetails}>
          <InvestmentCardDetailsEntry>
            <InvestmentCardDetailsEntryLabel>Projected fundraise</InvestmentCardDetailsEntryLabel>
            <InvestmentCardDetailsEntryValue>{props.details.projectedFundraise}</InvestmentCardDetailsEntryValue>
          </InvestmentCardDetailsEntry>

          <InvestmentCardDetailsSeparator />
          
          <InvestmentCardDetailsEntry>
            <InvestmentCardDetailsEntryLabel>Minimum Investment</InvestmentCardDetailsEntryLabel>
            <InvestmentCardDetailsEntryValue>{props.details.minimumInvestment}</InvestmentCardDetailsEntryValue>
          </InvestmentCardDetailsEntry>
          
          <InvestmentCardDetailsSeparator />
          
          <InvestmentCardDetailsEntry>
            <InvestmentCardDetailsEntryLabel>Investment type</InvestmentCardDetailsEntryLabel>
            <InvestmentCardDetailsEntryValue>{props.details.investmentType}</InvestmentCardDetailsEntryValue>
          </InvestmentCardDetailsEntry>
          
          <InvestmentCardDetailsSeparator />
          
          <InvestmentCardDetailsEntry>
            <InvestmentCardDetailsEntryLabel>Issuer</InvestmentCardDetailsEntryLabel>
            <InvestmentCardDetailsEntryValue>{props.details.issuer}</InvestmentCardDetailsEntryValue>
          </InvestmentCardDetailsEntry>
        </InvestmentCardDetailsContainer>
        
        {props.saleStatus === 'Public Sale' && <InvestButton>Invest</InvestButton>}
        {props.saleStatus !== 'Public Sale' && <InvestButton>Learn More</InvestButton>}
      </InvestmentCardInfoContainer>
    </InvestmentCardContainer>
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
  min-height: 220px;
`

const InvestmentCardInfoContainer = styled.div<{ expanded: boolean }>`
  position: absolute;

  bottom: 0;

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


  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  margin-left: -1.5rem;
  margin-right: -1.5rem;

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
  background: ${props => props.theme.launchpad.colors.background};
  color: ${props => props.theme.launchpad.colors.primary};
  border: 1px solid ${props => props.theme.launchpad.colors.primary};
  border-radius: 6px;

  padding: 0.75rem;

  width: 100%;

  text-align: center;

  font-style: normal;
  font-weight: 600;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;
`

