import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { ChevronRight, Info } from 'react-feather'

import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'

import { Offer, OfferTimeframe, OfferTimeframeType } from 'state/launchpad/types'
import { OFFER_TIMEFRAME_TYPE_LABELS } from 'state/launchpad/constants'

import { InfoList } from '../util/InfoList'

interface Props {
  offer: Offer
}

const getTypeLabel = (type: OfferTimeframeType) => {
  return OFFER_TIMEFRAME_TYPE_LABELS.find(x => x.value === type)!.label
}

const getTooltip = (frame: OfferTimeframe) => {
  switch (frame.type) {
    case OfferTimeframeType.whitelist:
      return { 
        title: 'Register to invest', 
        body: 'You need to register to invest in order to participate in the pre-sale round. This stage does not apply for the Public Sale.'  
      }
      
    case OfferTimeframeType.preSale:
      return { 
        title: 'Pre-Sale', 
        body: 'The pre-sale round has its own maximum and minimum investment sizes that may differ from the public sale. You need to register to invest in order to participate in the pre-sale round.'  
      }
      
    case OfferTimeframeType.sale:
      return { 
        title: 'Public Sale ', 
        body: 'Public sale is open to everyone and will close on the date scheduled or earlier once the funding amount is reached.'  
      }
      
    case OfferTimeframeType.closed:
      return { 
        title: 'Closed', 
        body: 'The deal is closed for any further investments.'  
      }
      
    case OfferTimeframeType.claim:
      return { 
        title: 'Token Claim', 
        body: 'For successful deals that reached its funding goal, you can claim the token that you purchased. For unsuccessful deals that did not reach its funding goal, you can claim back your initial investment in USDT.'  
      }
      
  }
}

export const OfferStage: React.FC<Props> = (props) => {
  const theme = useTheme()
  const timeframes = React.useMemo(() => props.offer.timeframes
    .sort((a, b) => new Date(b.startDate).getMilliseconds() - new Date(a.startDate).getMilliseconds())
    .map(frame => {
      const hasStarted = frame.startDate <= new Date()

      const label = getTypeLabel(frame.type)
      const value = `${moment(frame.startDate).format('Do MMMM, HH:mm zz')} - ${moment(frame.endDate).format('Do MMM')}`

      return { 
        label: (
          <StageLabel hasStarted={hasStarted}>
            {hasStarted && <ChevronRight color={theme.launchpad.colors.primary} />}
            {label} 
            <Tooltip {...getTooltip(frame)}>
              <Info size="14" color={theme.launchpad.colors.text.caption}/>
            </Tooltip>
          </StageLabel>
        ), 
        value
      }
    }),
  [])

  return <InfoList title="Investment Stage" entries={timeframes} />
}

const StageLabel = styled.div<{ hasStarted: boolean}>`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;

  color: ${props => props.hasStarted
    ? props.theme.launchpad.colors.primary
    : props.theme.launchpad.colors.text.body};
`
