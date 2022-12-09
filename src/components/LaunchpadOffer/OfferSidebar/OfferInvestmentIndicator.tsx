import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ChevronDown, ChevronUp, Info } from 'react-feather'

import { Offer } from 'state/launchpad/types'
import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'

interface Props {
  offer: Offer
}

export const OfferInvestmentIndicator: React.FC<Props> = (props) => {
  const theme = useTheme()

  const investmentPercentage = React.useMemo(() => (Number(props.offer.totalInvestment) / Number(props.offer.hardCap)) * 100, [])

  const softCapPercentage = React.useMemo(() => (Number(props.offer.softCap) / Number(props.offer.hardCap)) * 100, [])
  const presalePercentage = React.useMemo(() => (Number(props.offer.presaleAlocated) / Number(props.offer.hardCap)) * 100, [])

  console.log(props.offer.totalInvestment, props.offer.hardCap)

  return (
    <IndicatorContainer>
      <Indicator percentage={investmentPercentage} />

      <SoftcapMarker percentage={softCapPercentage}>
        <div>
          Soft Cap
          
          <Tooltip title="Soft Cap" body="This is the minimum amount that needs to be raised for the deal to be successful.">
            <Info size="10" />  
          </Tooltip>
        </div>
        <ChevronDown fill={theme.launchpad.colors.primary} stroke={theme.launchpad.colors.primary} />
      </SoftcapMarker>

      <PreSaleGoalMarker percentage={presalePercentage}>
        <ChevronUp fill={theme.launchpad.colors.primary} stroke={theme.launchpad.colors.primary} />
        <div>
          Pre-Sale Goal
          
          <Tooltip 
            title="Pre-Sale Goal" 
            body={(
              <div>
                Deal issuers can divide the funding round by adding a &quot;pre-sale&quot; 
                round and allocating it a part of the total funding. 

                <br /><br />

                The pre-sale round is only available for investors approved in the 
                investment registration stage.
                
                <br /><br />

                Pre-sale is on a first come first serve basis.
              </div>
            )}
          >
            <Info size="10" />  
          </Tooltip>
        </div>
      </PreSaleGoalMarker>
    </IndicatorContainer>
  )
}

const IndicatorContainer = styled.div`
  position: relative;
  width: 100%;

  margin: 1rem 0;
`

const Indicator = styled.div<{ percentage: number }>`
  position: relative;

  width: 100%;
  height: 16px;

  background: ${props => props.theme.launchpad.colors.foreground};
  border-radius: 57px;

  ::before {
    position: absolute;
    top: 0;
    left: 0;

    content: '';

    height: 16px;
    width: ${props => props.percentage}%;

    background: ${props => props.theme.launchpad.colors.primary};
    border-radius: 57px;
  }
`

const Marker = styled.div<{ percentage: number }>`
  position: absolute;

  left: ${props => props.percentage}%;
  transform: translate(-50%, 0);

  display: flex;

  flex-flow: column nowrap;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;

  line-height: 12px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`

const SoftcapMarker = styled(Marker)`
  top: -2rem;
`

const PreSaleGoalMarker = styled(Marker)`
  bottom: -2rem;
`
