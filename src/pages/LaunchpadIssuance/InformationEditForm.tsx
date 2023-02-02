import React from 'react'

import { IssuancePageLayout } from './layout'
import { IssuanceInformationForm } from 'components/LaunchpadIssuance/IssuanceForm/Information'


export default function InformationFormPage(props: React.PropsWithChildren) {
  return (
    <IssuancePageLayout>
      <IssuanceInformationForm edit />
    </IssuancePageLayout>
  )
}
