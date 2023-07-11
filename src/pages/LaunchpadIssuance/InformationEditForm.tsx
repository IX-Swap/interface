import React from 'react'

import { IssuancePageLayout } from './layout'
import { IssuanceInformationForm } from 'components/LaunchpadIssuance/IssuanceForm/Information'

export default function InformationFormPage() {
  return (
    <IssuancePageLayout>
      <IssuanceInformationForm edit />
    </IssuancePageLayout>
  )
}
