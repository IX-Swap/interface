import React from 'react'
import { useTheme } from 'styled-components'

import { NewIssuanceForm } from 'components/LaunchpadIssuance/IssuanceForm'
import { IssuancePageLayout } from './layout'

export default function IssuanceFormPage() {
  const theme = useTheme()

  return (
    <IssuancePageLayout background={theme.launchpad.colors.foreground}>
      <NewIssuanceForm />
    </IssuancePageLayout>
  )
}
