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
        <PageHeader title='My DSOs' />
      </Grid>
      <RootContainer>
        <Grid item container justifyContent='flex-end'>
          <Button
            component={AppRouterLinkComponent}
            size='large'
            color='primary'
            variant='contained'
            to={IssuanceRoute.create}
          >
            Add
          </Button>
        </Grid>
        <Grid item>
          <MyDSOsTable />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
