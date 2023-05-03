import { IssuanceVettingForm } from 'components/LaunchpadIssuance/IssuanceForm/Vetting'
import React from 'react'

import { IssuancePageLayout } from './layout'

export default function VettingFormPage() {
  return (
    <IssuancePageLayout>
      <IssuanceVettingForm />
    </IssuancePageLayout>
  )
}
