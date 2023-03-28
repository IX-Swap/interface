import { Button, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { TenantsTable } from './components/TenantsTable'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'

export const Tenants = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title='Manage Tenants'
          endComponent={
            <Grid container spacing={2} wrap={'nowrap'}>
              <Grid item minWidth={320} width={'100%'}>
                <TextInputSearchFilter
                  fullWidth
                  placeholder='Search'
                  inputAdornmentPosition='start'
                  sx={{ height: 50 }}
                />
              </Grid>
              <Grid item width={'100%'}>
                <Button size='large' color='primary' variant='contained'>
                  Create New Tenant
                </Button>
              </Grid>
            </Grid>
          }
        />
      </Grid>
      <RootContainer>
        <TenantsTable />
      </RootContainer>
    </Grid>
  )
}
