import React from 'react'

import { IssuanceDashboard } from 'components/LaunchpadIssuance/IssuanceDashboard'
import { IssuancePageLayout } from './layout'

export default function IssuanceDashboardPage() {
  return (
    <IssuancePageLayout>
      <IssuanceDashboard />
    </IssuancePageLayout>
  )
}
