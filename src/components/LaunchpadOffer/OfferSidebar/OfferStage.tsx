import React from 'react'
import moment from 'moment'
import styled, { useTheme } from 'styled-components'

import { ChevronRight, Info } from 'react-feather'

import { Tooltip } from 'components/Launchpad/InvestmentCard/Tooltip'

import { OfferTimeframe, OfferTimeframeType } from 'state/launchpad/types'

import { InfoList } from '../util/InfoList'

const getTooltip = (type: OfferTimeframeType) => {
  switch (type) {
    case OfferTimeframeType.whitelist:
      return { 
        title: 'Register To invest', 
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
        body: 'For successful deals that reached their funding goal, you will receive the tokens that you purchased. You can claim back your initial investment for unsuccessful deals that did not reach their funding goal.'  
      }
      
  }
}

const format = (from: Date, to?: Date) =>
  moment(from).format('Do MMM, HH:mm') + (to ? ` - ${moment(to).format('Do MMM')}` : '')

const hasStarted = (date: Date) => date ? Date.parse(date.toString()) <= Date.now() : false

interface StageProps {
  frames: OfferTimeframe
}

export const OfferStage: React.FC<StageProps> = (props) => {
  const theme = useTheme()

  const stageHasStarted = React.useMemo(() => ({
    whitelist: hasStarted(props.frames.whitelist),
    preSale: hasStarted(props.frames.preSale),
    sale: hasStarted(props.frames.sale),
    closed: hasStarted(props.frames.closed),
    claim: hasStarted(props.frames.claim),
  }), [props.frames])

  const whitelistAndPresale = React.useMemo(() => props.frames.whitelist ? [
    {
      label: (
        <StageLabel hasStarted={stageHasStarted.whitelist}>
          {stageHasStarted.whitelist && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

          <div>Register To invest</div>

          <Tooltip {...getTooltip(OfferTimeframeType.whitelist)}>
            <Info size="14" color={theme.launchpad.colors.text.caption}/>
          </Tooltip>
        </StageLabel>
      ),
      value: (
        <Nowrap>{format(props.frames.whitelist, props.frames.preSale)}</Nowrap>
      )
    },
    {
      label: (
        <StageLabel hasStarted={stageHasStarted.preSale}>
          {stageHasStarted.preSale && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

          <div>Pre-Sale</div>

          <Tooltip {...getTooltip(OfferTimeframeType.preSale)}>
            <Info size="14" color={theme.launchpad.colors.text.caption}/>
          </Tooltip>
        </StageLabel>
      ),
      value: (
        <Nowrap>{format(props.frames.preSale, props.frames.sale)}</Nowrap>
      )
    },
  ] : [], [])

  const timeframes = React.useMemo(() => {
    const items = [      
      { 
        label: (
          <StageLabel hasStarted={stageHasStarted.sale}>
            {stageHasStarted.sale && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

            <div>Public Sale</div> 

            <Tooltip {...getTooltip(OfferTimeframeType.sale)}>
              <Info size="14" color={theme.launchpad.colors.text.caption}/>
            </Tooltip>
          </StageLabel>
        ),
        value: (
          <Nowrap>{format(props.frames.sale, props.frames.closed)}</Nowrap>
        )
      },
      { 
        label: (
          <StageLabel hasStarted={stageHasStarted.closed}>
            {stageHasStarted.closed && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

            <div>Closed</div>

            <Tooltip {...getTooltip(OfferTimeframeType.closed)}>
              <Info size="14" color={theme.launchpad.colors.text.caption}/>
            </Tooltip>
          </StageLabel>
        ),
        value: (
          <Nowrap>{format(props.frames.closed, props.frames.claim)}</Nowrap>
        )
      },
      { 
        label: (
          <StageLabel hasStarted={stageHasStarted.claim}>
            {stageHasStarted.claim && <ChevronRight fill={theme.launchpad.colors.primary} size="10" />}

            <div>Token Claim</div>

            <Tooltip {...getTooltip(OfferTimeframeType.claim)}>
              <Info size="14" color={theme.launchpad.colors.text.caption}/>
            </Tooltip>
          </StageLabel>
        ),
        value: (
          <Nowrap>{format(props.frames.claim)}</Nowrap>
        )
      }]
    
    return [ ...whitelistAndPresale, ...items]
  }, [])

  return <InfoList title="Investment Stage" entries={timeframes} />
}

const Nowrap = styled.div`
  white-space: nowrap;
`

const StageLabel = styled(Nowrap)<{ hasStarted: boolean}>`
  display: flex;

  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  gap: 0.25rem;

  color: ${props => props.hasStarted
    ? props.theme.launchpad.colors.primary
    : props.theme.launchpad.colors.text.body};
`
