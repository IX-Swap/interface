import React from 'react'
import styled, { useTheme } from 'styled-components'

import { ChevronDown, ChevronUp } from 'react-feather'

import { Offer } from 'state/launchpad/types'

interface Props {
  offer: Offer
}

export const OfferInvestmentIndicator: React.FC<Props> = (props) => {
  const theme = useTheme()

  return (
    <IndicatorContainer>
      <Indicator percentage={50} />

      <SoftcapMarker percentage={20}>
        <div>Soft Cap</div>
        <ChevronDown fill={theme.launchpad.colors.primary} stroke={theme.launchpad.colors.primary} />
      </SoftcapMarker>

      <PreSaleGoalMarker percentage={35}>
        <ChevronUp fill={theme.launchpad.colors.primary} stroke={theme.launchpad.colors.primary} />
        <div>Pre-Sale Goal</div>
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

  display: flex;

  flex-flow: column nowrap;
  align-items: center;

  font-style: normal;
  font-weight: 500;
  font-size: 10px;

  line-height: 12px;
  letter-spacing: -0.02em;

  color: ${props => props.theme.launchpad.colors.text.caption};
`

const SoftcapMarker = styled(Marker)`
  top: -2rem;
`

const PreSaleGoalMarker = styled(Marker)`
  bottom: -2rem;
`
