import React from 'react'
import { Button, Grid, Typography } from '@mui/material'
import { FieldContainer } from 'ui/FieldContainer/FieldContainer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { Table } from 'app/pages/accounts/pages/banks/pages/BanksList/Table'

export const CashAccounts = () => {
  return (
    <FieldContainer>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          container
          alignItems='center'
          justifyContent='space-between'
        >
          <Grid item>
            <Typography variant='h5' display='inline-flex' alignItems='center'>
              Cash Accounts
            </Typography>
          </Grid>
          <Grid item>
            <Button
              component={AppRouterLinkComponent}
              color='primary'
              variant='outlined'
              to={AccountsRoute.banks}
              data-testid='invest-link'
              // sx={{ px: 0 }}
            >
              View All Cash Accounts
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Table limitRows={2} />
        </Grid>
      </Grid>
    </FieldContainer>
  )
}
