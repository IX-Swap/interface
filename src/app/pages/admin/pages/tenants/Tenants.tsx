import { Button, Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import React from 'react'
import { RootContainer } from 'ui/RootContainer'
import { TenantsTable } from './components/TenantsTable'
import { TextInputSearchFilter } from 'app/components/TextInputSearchFilter'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AdminRoute } from 'app/pages/admin/router/config'

export const Tenants = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title='Manage Client Spaces'
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
                <Button
                  component={AppRouterLinkComponent}
                  size='large'
                  color='primary'
                  variant='contained'
                  to={AdminRoute.createTenant}
                >
                  Create new Client Space
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
