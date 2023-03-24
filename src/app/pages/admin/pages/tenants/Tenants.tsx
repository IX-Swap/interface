import { Button, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { TenantsTable } from './components/TenantsTable'
import { VSpacer } from 'components/VSpacer'

export const Tenants = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title='Manage Tenants'
          endComponent={
            <Button size='large' color='primary' variant='contained'>
              Create New Tenant
            </Button>
          }
        />
      </Grid>
      <RootContainer>
        <Grid item xs={12}>
          <VSpacer size='small' />
          <TenantsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
