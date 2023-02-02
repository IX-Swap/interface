import { IssuanceReport } from 'components/LaunchpadIssuance/IssuanceReport'
import React from 'react'

import { IssuancePageLayout } from './layout'

export default function IssuanceReportPage() {
  return (
    <IssuancePageLayout>
      <IssuanceReport />
    </IssuancePageLayout>
  )
}
