import React from 'react'

import { Offer } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'

interface Props {
  offer: Offer
}

export const OfferVesting: React.FC<Props> = () => {
  const entries = React.useMemo(() => [
    { label: 'Vesting starts', value: 'N/A' },
    { label: 'Period', value: 'N/A' },
    { label: 'Payout frequency', value: 'N/A' },
    { label: 'Percentage distributed per frequency', value: 'N/A' },
    { label: 'Cliff', value: 'N/A' },
  ], [])

  return <InfoList title="Vesting" entries={entries} />
}
