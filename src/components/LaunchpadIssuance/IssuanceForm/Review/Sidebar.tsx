import React from 'react'
import styled from 'styled-components'

import { Column } from 'components/LaunchpadMisc/styled'
import { Offer } from 'state/launchpad/types'

interface Props {
  offer: Partial<Offer>
  onSubmit: (isDraft: boolean) => void
}

export const ReviewSidebar: React.FC<Props> = (props) => {
  const options = React.useMemo(() => {
    const base = [
      { label: 'Company Information', isComplete: props.offer.issuerName && props.offer.country && props.offer.investmentType },
      { label: 'Tokenomics', isComplete: props.offer.tokenPrice && props.offer.tokenStandart && props.offer.tokenSymbol && props.offer.tokenTicker && props.offer.tokenAddress },
      { label: 'Pre-Sale', isComplete: true },
      { label: 'Timelines', isComplete: true },
      { label: 'Offering Terms', isComplete: true },
      { label: 'Additional Information', isComplete: true },
      { label: 'Upload Documents', isComplete: true },
      { label: 'Images', isComplete: true },
      { label: 'Videos' },
      { label: 'Pitch', isComplete: true },
      { label: 'Team Members' },
      { label: 'FAQ' },
    ]

    return base
  }, [props.offer])

  return (
    <Column>

    </Column>
  )
}
