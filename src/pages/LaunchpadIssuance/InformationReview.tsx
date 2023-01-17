import React from 'react'

import { IssuancePageLayout } from './layout'
import { OfferReview } from 'components/LaunchpadIssuance/IssuanceForm/Review'

export default function InformationReviewPage() {
  return (
    <IssuancePageLayout>
      <OfferReview />
    </IssuancePageLayout>
  )
}
