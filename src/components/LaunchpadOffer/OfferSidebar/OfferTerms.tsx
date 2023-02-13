import React from 'react'

import { OfferTerms as OfferTermsInfo } from 'state/launchpad/types'
import { InfoList } from '../util/InfoList'

interface Props {
  terms: OfferTermsInfo
}

export const OfferTerms: React.FC<Props> = (props) => {
  const terms = React.useMemo(
    () => [
      { label: 'Investment Structure', value: props.terms.investmentStructure ?? 'N/A' },
      { label: 'Divident Yield', value: props.terms.dividentYield ?? 'N/A' },
      { label: 'Investment Period', value: props.terms.investmentPeriod ?? 'N/A' },
      { label: 'Gross IRR (%)', value: props.terms.grossIrr ?? 'N/A' },
      { label: 'Distribution Frequency', value: props.terms.distributionFrequency ?? 'N/A' },
    ],
    [
      props.terms.investmentPeriod,
      props.terms.distributionFrequency,
      props.terms.dividentYield,
      props.terms.grossIrr,
      props.terms.investmentStructure,
    ]
  )

  return <InfoList title="Offering Terms" entries={terms} />
}
