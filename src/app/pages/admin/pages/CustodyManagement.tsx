import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { CustodyManagementTable } from 'app/pages/admin/components/CustodyManagementTable/CustodyManagementTable'
import { CustodyManagementFilters } from 'app/pages/admin/components/CustodyManagementFilters'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const CustodyManagement = () => {
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Custody Management' />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item container justify={'space-between'}>
        <Grid item xs={12} sm={7} md={5} lg={4}>
          <AccountsUnderCustody />
        </Grid>
        <Grid
          data-testid={'listed-tokens-wrapper'}
          item
          container
          xs={12}
          sm={'auto'}
          style={{ width: 'max-content', marginTop: isMobile ? 30 : 0 }}
        >
          {/* TODO Added ViewListedTokens component here when backend api will be ready */}
        </Grid>
      </Grid>
      <Grid item>
        <VSpacer size={'medium'} />
        <CustodyManagementFilters />
        <VSpacer size={'medium'} />
      </Grid>
      <Grid item>
        <CustodyManagementTable />
      </Grid>
      {/* TODO Added ListedTokensDialog component here when backend api will be ready */}
    </Grid>
  )
}
