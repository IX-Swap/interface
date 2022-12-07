import React from 'react'
import styled, { useTheme } from 'styled-components'

import { Link } from 'react-router-dom'
import { Copy, Info } from 'react-feather'

import { Offer, OfferStatus } from 'state/launchpad/types'

import MetamaskIcon from 'assets/images/metamask.png'

import { useFormatOfferValue } from 'state/launchpad/hooks'

import { InvestmentSaleStatusInfo } from 'components/Launchpad/InvestmentCard/InvestmentSaleStatusInfo'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'
import { InfoList } from 'components/LaunchpadOffer/util/InfoList'

import { OfferInvestmentIndicator } from './OfferInvestmentIndicator'
import { OfferFundRaiseIndicator } from './OfferFundRaiseIndicatpor'

import { InvestDialog } from '../InvestDialog'
import { Row, Column, Separator } from '../styled'

import { shortenAddress } from 'utils'

interface Props {
  offer: Offer
}

enum OfferStageStatus {
  notStarted,
  active,
  closed
}

const capitalize = (value: string) => `${value[0].toUpperCase()}${value.slice(1).toLowerCase()}`

export const OfferDetails: React.FC<Props> = (props) => {
  const theme = useTheme()
  const formatedValue = useFormatOfferValue()

  const formatter = React.useMemo(() => new Intl.NumberFormat('en-US', { currency: 'USD' }), [])

  const minTokenInvestment = React.useMemo(() => formatedValue(`${Math.floor(Number(props.offer.minInvestment) / Number(props.offer.tokenPrice))}`), [])
  const maxTokenInvestment = React.useMemo(() => formatedValue(`${Math.floor(Number(props.offer.maxInvestment) / Number(props.offer.tokenPrice))}`), [])

  const offerInfo = React.useMemo(() => [
    { label: 'Issuer', value: props.offer.issuerName },
    { label: 'Country', value: props.offer.country },
    { label: 'Investment Type', value: props.offer.investmentType },
    { label: 'Token Price', value: `${props.offer.investingTokenSymbol}  ${formatedValue(props.offer.tokenPrice)} / 1 ${props.offer.tokenSymbol}` },
    { label: 'Max. Investment Size', value: `${props.offer.investingTokenSymbol} ${formatedValue(props.offer.maxInvestment)} / ${maxTokenInvestment} ${props.offer.tokenSymbol}` },
    { label: 'Min. Investment Size', value: `${props.offer.investingTokenSymbol}  ${formatedValue(props.offer.minInvestment)} / ${minTokenInvestment} ${props.offer.tokenSymbol}` },
  ], [minTokenInvestment, maxTokenInvestment])

  const stageStatus = React.useMemo(() => {
    switch (props.offer.status) {
      case OfferStatus.preSale:
      case OfferStatus.sale:
        return OfferStageStatus.active
        
      case OfferStatus.closed:
      case OfferStatus.claim:
        return OfferStageStatus.closed

      default:
        return OfferStageStatus.notStarted
    }
  }, [])

  const [showInvestDialog, setShowInvestDialog] = React.useState(false)

  const openInvestDialog = React.useCallback(() => setShowInvestDialog(true), [])
  const closeInvestDialog = React.useCallback(() => setShowInvestDialog(false), [])

  return (
    <Container>
      <OfferSidebarSummary>
        <Column margin="0 0 1rem 0">
          {stageStatus === OfferStageStatus.closed && 
            <InvestmentSaleStatusInfo 
              isClosed       
              isSuccesfull={props.offer.softCapReached}
              daysTillClosed={props.offer.daysTillSale}
              allowOnlyAccredited={props.offer.allowOnlyAccredited}
              margin="0 0 1.5rem 0"
            />
          }

          {stageStatus === OfferStageStatus.notStarted && <OfferNotStartedLabel>Not Started</OfferNotStartedLabel>}
          {stageStatus !== OfferStageStatus.notStarted && (
            <>
              <OfferInvestmentAmount>
                {props.offer.investingTokenSymbol} {formatter.format(props.offer.totalInvestment)}
              </OfferInvestmentAmount>

              <Row alignItems="center" gap="1rem">
                <OfferFundRaiseIndicator offer={props.offer} size={32} /> 
                <OfferFundRaiseLabel>Raised</OfferFundRaiseLabel>
              </Row>
            </>
          )}
        </Column>

        <OfferInvestmentIndicator offer={props.offer} />
        
        <Separator marginTop="1rem" marginBottom='1rem'/>

        <OfferStats>
          <Participants>
            <header>
              Participants
              <Tooltip title="Participants" body="Number of investors that has participated in this deal">
                <Info size="12" />
              </Tooltip>
            </header>

            <main>0</main>
          </Participants>

          <DayCount>
            <header>The deal closes in</header>
            <main>{props.offer.daysTillSale ?? 0} Days</main>
          </DayCount>
        </OfferStats>

        <InvestButtonContainer>
          {stageStatus !== OfferStageStatus.notStarted &&
            <InvestButton onClick={openInvestDialog}>
              {stageStatus === OfferStageStatus.active && 'Invest'}
              {stageStatus === OfferStageStatus.closed && 'Open dashboard '}
            </InvestButton>
          }

          <InvestHelpLink to="#">How does this work?</InvestHelpLink>
        </InvestButtonContainer>

        {showInvestDialog && <InvestDialog offer={props.offer} onClose={closeInvestDialog} />}
      </OfferSidebarSummary>

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

const OfferSidebarSummary = styled.div`
  display: flex;
  
  flex-flow: column nowrap;
  align-items: stretch;
  gap: 1rem;
`

const OfferFundRaiseLabel = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;

  line-height: 160%;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.body};
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
    display: flex;
    align-items: center;
    gap: 0.5rem;

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
