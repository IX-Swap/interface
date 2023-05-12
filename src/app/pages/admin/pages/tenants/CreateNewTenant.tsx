import React from 'react'
import { TenantForm } from './components/TenantForm'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { Grid } from '@mui/material'
import { RootContainer } from 'ui/RootContainer'

export const CreateNewTenant = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Create New Client Space ' />
      </Grid>
      <RootContainer>
        <Grid item>
          <TenantForm />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
