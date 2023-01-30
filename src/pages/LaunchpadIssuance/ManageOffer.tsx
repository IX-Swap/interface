import React from 'react'

import { ManageOffer } from 'components/LaunchpadIssuance/ManageOffer'
import { IssuancePageLayout } from './layout'

export default function ManageOfferPage(props: React.PropsWithChildren) {
  return (
    <IssuancePageLayout>
      <ManageOffer />
    </IssuancePageLayout>
  )
}
