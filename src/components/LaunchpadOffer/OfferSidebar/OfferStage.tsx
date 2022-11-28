import React from 'react'
import moment from 'moment'
import styled from 'styled-components'

import { ChevronRight } from 'react-feather'

import { Offer, OfferTimeframeType } from 'state/launchpad/types'
import { OFFER_TIMEFRAME_TYPE_LABELS } from 'state/launchpad/constants'

import { InfoList } from '../util/InfoList'

interface Props {
  offer: Offer
}

const getTypeLabel = (type: OfferTimeframeType) => {
  return OFFER_TIMEFRAME_TYPE_LABELS.find(x => x.value === type)!.label
}

export const OfferStage: React.FC<Props> = (props) => {
  const timeframes = React.useMemo(() => props.offer.timeframes
    .sort((a, b) => new Date(b.startDate).getMilliseconds() - new Date(a.startDate).getMilliseconds())
    .map(frame => {
      const hasStarted = frame.startDate <= new Date()

      const label = getTypeLabel(frame.type)
      const value = `${moment(frame.startDate).format('Do MMMM, HH:mm zz')} - ${moment(frame.endDate).format('Do MMM')}`

      if (hasStarted) {
        return { label: <StageLabel><ChevronRight /> {label}</StageLabel>, value }
      }

      return { label, value }
    }),
  [])

  return <InfoList title="Investment Stage" entries={timeframes} />
}

const StageLabel = styled.div`
  display: flex;

  flex-flow: row nowrap;
  align-items: center;

  gap: 0.5rem;

  color: ${props => props.theme.launchpad.colors.primary};

  svg {
    fill: ${props => props.theme.launchpad.colors.primary};
  }
`
