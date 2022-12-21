import React from 'react'

import { IssuanceForm } from 'components/LaunchpadIssuance/IssuanceForm'
import { IssuancePageLayout } from './layout'


export default function IssuanceFormPage(props: React.PropsWithChildren) {
  return (
    <IssuancePageLayout>
      <IssuanceForm />
    </IssuancePageLayout>
  )
}
