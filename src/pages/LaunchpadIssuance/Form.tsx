import React from 'react'
import { useTheme } from 'styled-components'

import { NewIssuanceForm } from 'components/LaunchpadIssuance/NewIssuanceForm'
import { IssuancePageLayout } from './layout'


export default function IssuanceFormPage(props: React.PropsWithChildren) {
  const theme = useTheme()

  return (
    <IssuancePageLayout background={theme.launchpad.colors.foreground}>
      <NewIssuanceForm />
    </IssuancePageLayout>
  )
}
