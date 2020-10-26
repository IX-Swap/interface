import React from 'react'
import { Grid } from '@material-ui/core'
import { IndividualPreview } from 'v2/app/pages/identity/components/IndividualPreview'
import { CorporatePreview } from 'v2/app/pages/identity/components/CorporatePreview'

export const IdentityRoot: React.FC = () => {
  return (
    <Grid container direction='column' alignItems='flex-start' spacing={2}>
      <IndividualPreview />
      <CorporatePreview />
    </Grid>
  )
}
