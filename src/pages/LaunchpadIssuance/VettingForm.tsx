import React from 'react'

import { IssuancePageLayout } from './layout'
import { IssuanceVettingForm } from 'components/LaunchpadIssuance/IssuanceVettingForm'


export default function VettingFormPage(props: React.PropsWithChildren) {
  return (
    <IssuancePageLayout>
      <IssuanceVettingForm />
    </IssuancePageLayout>
  )
}
