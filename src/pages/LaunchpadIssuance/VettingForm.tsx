import { IssuanceVettingForm } from 'components/LaunchpadIssuance/IssuanceForm/Vetting'
import React from 'react'

import { IssuancePageLayout } from './layout'


export default function VettingFormPage(props: React.PropsWithChildren) {
  return (
    <IssuancePageLayout>
      <IssuanceVettingForm />
    </IssuancePageLayout>
  )
}
