import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { IndividualPreview } from 'app/pages/identity/components/IndividualPreview/IndividualPreview'
import { CorporatesPreview } from 'app/pages/identity/components/CorporatesPreview/CorporatesPreview'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const IdentitiesList: React.FC = () => {
  return (
    <Grid>
      <Grid item xs={12}>
        <PageHeader alignment='flex-start' showBreadcrumbs={false} />
      </Grid>
      <Grid
        item
        xs={12}
        container
        direction='column'
        alignItems='flex-start'
        spacing={2}
      >
        <IndividualPreview />
        <VSpacer size='medium' />
        <CorporatesPreview type='investor' />
        <CorporatesPreview type='issuer' />
      </Grid>
    </Grid>
  )
}
