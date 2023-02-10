import { IssuanceVettingForm } from 'components/LaunchpadIssuance/IssuanceForm/Vetting'
import React from 'react'

import { IssuancePageLayout } from './layout'

export default function VettingFormView() {
  return (
    <IssuancePageLayout>
      <IssuanceVettingForm />
    </IssuancePageLayout>
  )
}
