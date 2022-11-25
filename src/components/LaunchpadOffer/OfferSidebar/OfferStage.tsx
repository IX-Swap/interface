import React from 'react'
import moment from 'moment'

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
    .map(frame => ({ 
      label: getTypeLabel(frame.type),
      value: `${moment(frame.startDate).format('Do MMMM, HH:mm zz')} - ${moment(frame.endDate).format('Do MMM')}`
    })), 
  [])

  return <InfoList title="Investment Stage" entries={timeframes} />
}
