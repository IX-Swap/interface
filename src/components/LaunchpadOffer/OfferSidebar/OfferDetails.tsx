import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Copy } from 'react-feather'

import { Offer, OfferStatus } from 'state/launchpad/types'

import MetamaskIcon from 'assets/images/metamask.png'

import { InvestmentSaleStatusInfo } from 'components/Launchpad/InvestmentCard/InvestmentSaleStatusInfo'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'

import { shortenAddress } from 'utils'
import { OfferInvestmentIndicator } from './OfferInvestmentIndicator'
import { Link } from 'react-router-dom'

interface Props {
  offer: Offer
}

const capitalize = (value: string) => `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`

export const OfferDetails: React.FC<Props> = (props) => {
  const theme = useTheme()

  const minTokenInvestment = React.useMemo(() => Math.floor(Number(props.offer.minInvestment) / Number(props.offer.tokenUsdValue)), [])
  const maxTokenInvestment = React.useMemo(() => Math.floor(Number(props.offer.maxInvestment) / Number(props.offer.tokenUsdValue)), [])

  const offerInfo = React.useMemo(() => [
    { label: 'Issuer', value: props.offer.issuerName },
    { label: 'Country', value: props.offer.country },
    { label: 'Investment Type', value: props.offer.investmentType },
    { label: 'Token Price', value: `$${props.offer.tokenUsdValue} / 1 ${props.offer.tokenSymbol}` },
    { label: 'Max. Investment Size', value: `$${props.offer.maxInvestment} / ${maxTokenInvestment} ${props.offer.tokenSymbol}` },
    { label: 'Min. Investment Size', value: `$${props.offer.minInvestment} / ${minTokenInvestment} ${props.offer.tokenSymbol}` },
  ], [minTokenInvestment, maxTokenInvestment])

  const showAmount = React.useMemo(() => [OfferStatus.preSale, OfferStatus.sale, OfferStatus.closed].includes(props.offer.status), [])
  const formatter = React.useMemo(() => new Intl.NumberFormat('en-US', { currency: 'USD' }), [])

  return (
    <Container>
      {props.offer.status === OfferStatus.closed && 
        <InvestmentSaleStatusInfo 
          isClosed       
          isSuccesfull={props.offer.softCapReached}
          daysTillClosed={props.offer.daysTillClosed}
          allowOnlyAccredited={props.offer.allowOnlyAccredited}
        />
      }

      {!showAmount && <OfferNotStartedLabel>Not Started</OfferNotStartedLabel>}
      {showAmount && (
        <>
          <OfferInvestmentAmount>${formatter.format(props.offer.totalInvestment)}</OfferInvestmentAmount>
        </>
      )}
      
      <OfferInvestmentIndicator offer={props.offer} />
      
      <Separator />

      <OfferStats>
        <Participants>
          <header>Participants</header>
          <main>0</main>
        </Participants>

        <DayCount>
          <header>The deal closes in</header>
          <main>{props.offer.daysTillSale ?? 0} Days</main>
        </DayCount>
      </OfferStats>

      <InvestButtonContainer>
        <InvestButton>Register to Invest</InvestButton>
        <InvestHelpLink to="#">How does this work?</InvestHelpLink>
      </InvestButtonContainer>

      <TokenInfo>
        <TokenInfoCard><span className='label'>Token Network: </span>{capitalize(props.offer.network)}</TokenInfoCard>
        <TokenInfoCard>Explorer</TokenInfoCard>
        <TokenInfoCard>
          {shortenAddress(props.offer.contractAddress, 5)}
          <Copy stroke={theme.launchpad.colors.text.body} size="18" />
        </TokenInfoCard>
        <TokenInfoCard>
          Add to Metamask
          <img src={MetamaskIcon} width="20" />
        </TokenInfoCard>
      </TokenInfo>

      <InfoList entries={offerInfo} />
    </Container>
  )
}

const Container = styled.div`
  display: flex;

  flex-flow: column nowrap;

  justify-content: flex-start;
  align-items: stretch;

  gap: 2rem;
`

const OfferInvestmentAmount = styled.div`
  font-style: normal;
  font-weight: 800;
  font-size: 48px;

  line-height: 120%;
  letter-spacing: -0.03em;

  color: ${props => props.theme.launchpad.colors.primary};
`

const OfferNotStartedLabel = styled(OfferInvestmentAmount)`
  color: ${props => props.theme.launchpad.colors.text.caption};
`

const OfferStats = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: space-between;
  alignt-items: flex-start;
`

const Participants = styled.div`
  text-align: left;
  font-style: normal;

  header {
    font-weight: 400;
    font-size: 13px;

    line-height: 16px;
    letter-spacing: -0.02em;
    
    color: ${props => props.theme.launchpad.colors.text.body};
  }

  main {
    font-weight: 800;
    font-size: 32px;

    line-height: 120%;
    letter-spacing: -0.03em;
    
    color: ${props => props.theme.launchpad.colors.text.title};
  }
`

const DayCount = styled(Participants)`
  text-align: right;
`

const InvestButtonContainer = styled.div`
  display: flex;

  flex-flow: column nowrap;
  align-items: center;

`

const InvestHelpLink = styled(Link)`
  font-style: normal;
  font-weight: 400;
  font-size: 13px;

  line-height: 16px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.primary};

  text-decoration: none;
  padding: 1rem;
`

const InvestButton = styled.button`
  height: 60px;
  width: 100%;

  color: ${props => props.theme.launchpad.colors.text.light};
  background: ${props => props.theme.launchpad.colors.primary};

  cursor: pointer;
  
  border: none;
  border-radius: 6px;

  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  line-height: 19px;
  letter-spacing: -0.02em;
`

const TokenInfo = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);

  gap: 1rem;
`

const TokenInfoCard = styled.div`
  display: flex;

  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  height: 36px;

  font-style: normal;
  font-weight: 500;
  font-size: 13px;

  line-height: 150%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.title};

  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  border-radius: 6px;

  .label {
    color: ${props => props.theme.launchpad.colors.text.body};
    margin-right: 0.5rem;
  }

  svg, img {
    margin-left: 0.5rem;
  }
`


const Separator = styled.hr`
  border: 1px solid ${props => props.theme.launchpad.colors.border.default};
  opacity: 0.8;

  margin: 0;
`
