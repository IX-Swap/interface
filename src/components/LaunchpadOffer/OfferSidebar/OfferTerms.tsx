import React from 'react'
import styled from 'styled-components'

import { Offer } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'

interface Props {
  offer: Offer
}

export const OfferTerms: React.FC<Props> = (props) => {
  const terms = React.useMemo(() => [
    { label: 'Investment Structure', value: props.offer.terms.investmentStructure ?? 'N/A' },
    { label: 'Divident Yield', value: props.offer.terms.dividentYield ?? 'N/A' },
    { label: 'Invsetment Period', value: props.offer.terms.investmentPeriod ?? 'N/A' },
    { label: 'Gross IRR (%)', value: props.offer.terms.grossIrr ?? 'N/A' },
    { label: 'Distribution Frequency', value: props.offer.terms.distributionFrequency ?? 'N/A' },
  ], [])

  return <InfoList title="Offer Terms" entries={terms} />
}
