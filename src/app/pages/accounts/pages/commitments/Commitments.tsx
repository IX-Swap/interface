import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CommitmentsTable } from 'app/pages/accounts/components/Commitments/CommitmentsTable'
import { VSpacer } from 'components/VSpacer'
import React from 'react'

export const Commitments = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Pending Commitments' />
      </Grid>
      <VSpacer size='small' />
      <Grid item>
        <CommitmentsTable />
      </Grid>
    </Grid>
  )
}
