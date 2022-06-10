import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CommitmentsTable } from 'app/pages/accounts/components/Commitments/CommitmentsTable'
import { VSpacer } from 'components/VSpacer'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'

export const Commitments = () => {
  return (
    <Grid
      container
      direction='column'
      spacing={3}
      style={{ display: 'table', paddingLeft: '30px' }}
    >
      <PageHeader title='Pending Commitments' />
      <RootContainer>
        <VSpacer size='small' />
        <Grid item>
          <CommitmentsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
