import React from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { useStyles } from './CustodyManagement.styles'
import { RootContainer } from 'ui/RootContainer'

export const CustodyManagement = () => {
  const classes = useStyles()

  return (
    <Grid container direction='column' style={{ display: 'table' }}>
      <Grid item className={classes.title}>
        <PageHeader title='Custody Management' />
      </Grid>
      <RootContainer>
        <Grid item container justifyContent={'space-between'}>
          <Grid item xs={12} sm={7} md={5} lg={4} className={classes.firstItem}>
            <AccountsUnderCustody />
          </Grid>
          <Grid
            data-testid={'listed-tokens-wrapper'}
            item
            container
            xs={12}
            sm={'auto'}
            className={classes.listedTokensBlock}
          >
            {/* TODO Added ViewListedTokens component here when backend api will be ready */}
          </Grid>
        </Grid>
        <Grid item className={classes.item}>
          <CustodyManagementFilters />
        </Grid>
        <Grid item>
          <CustodyManagementTable />
        </Grid>
        {/* TODO Added ListedTokensDialog component here when backend api will be ready */}
      </RootContainer>
    </Grid>
  )
}
