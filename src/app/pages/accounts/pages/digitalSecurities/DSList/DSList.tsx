import React from 'react'
import { Button, Grid, Link } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DSTabs } from 'app/pages/accounts/pages/digitalSecurities/DSList/DSTabs'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { RootContainer } from 'ui/RootContainer'

export const DSList: React.FC = () => {
  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='Security Tokens' />
      </Grid>
      <RootContainer>
        <Grid
          item
          xs={12}
          container
          spacing={1}
          justifyContent='flex-end'
          mb={1}
        >
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              variant='outlined'
              color='primary'
              to={DSRoute.deposit}
            >
              Deposit
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              variant='outlined'
              color='primary'
              to={DSRoute.withdraw}
            >
              Withdraw
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              href='https://swap.investax.io/'
              target='_blank'
              variant='outlined'
              color='primary'
            >
              Swap
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} paddingLeft={3}>
          <DSTabs />
        </Grid>
      </RootContainer>
    </Grid>
  )
}
