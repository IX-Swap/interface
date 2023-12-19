import React from 'react'
import { MyDSOsTable } from 'app/pages/issuance/components/MyDSOsTable'
import { Button, Grid } from '@mui/material'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { RootContainer } from 'ui/RootContainer'

export const DSOList = () => {
  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item>
        <PageHeader
          title='My Security Token Offerings'
          endComponent={
            <Button
              component={AppRouterLinkComponent}
              to={IssuanceRoute.create}
              size='large'
              color='primary'
              variant='contained'
              disableElevation
              fullWidth
            >
              Create STO
            </Button>
          }
        />
      </Grid>
      <RootContainer>
        <Grid item>
          <MyDSOsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
