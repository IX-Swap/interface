import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'

export const CustodyManagement = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Custody Management' />
        <VSpacer size={'small'} />
      </Grid>
    </Grid>
  )
}
