import React from 'react'
import { DigitalSecurityOffering } from 'types/dso'
import { Grid } from '@material-ui/core'
import { useSetPageTitle } from 'app/hooks/useSetPageTitle'
import { DSOBaseFieldsView } from 'app/components/DSO/DSOPreview/DSOBaseFieldsView'
import { VSpacer } from 'components/VSpacer'
import { DSOPricingView } from 'app/components/DSO/DSOPreview/DSOPricingView'
import { DSOTermsView } from 'app/components/DSO/DSOPreview/DSOTermsView'
import { DSOInformationView } from 'app/components/DSO/DSOPreview/DSOInformationView'
import { DSOTeamView } from 'app/components/DSO/DSOPreview/DSOTeamView'

export interface DSOPreviewProps {
  data: DigitalSecurityOffering
  showAuthorizations?: boolean
}

export const DSOPreview = (props: DSOPreviewProps) => {
  const { data } = props

  useSetPageTitle(data.tokenName)

  return (
    <Grid container direction='column' spacing={3}>
      <Grid item>
        <VSpacer size='small' />
        <DSOBaseFieldsView dso={data} />
      </Grid>

      <Grid item>
        <VSpacer size='small' />
        <DSOPricingView dso={data} />
      </Grid>

      <Grid item>
        <VSpacer size='small' />
        <DSOTermsView dso={data} />
      </Grid>

      <Grid item>
        <VSpacer size='small' />
        <DSOInformationView dso={data} />
      </Grid>

      <Grid item>
        <VSpacer size='small' />
        <DSOTeamView dso={data} />
      </Grid>
    </Grid>
  )
}
