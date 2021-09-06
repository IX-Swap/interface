import React from 'react'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { AccountsUnderCustody } from 'app/pages/admin/components/AccountsUnderCustody'
import { InsightCard } from 'app/pages/issuance/components/CapTable/InsightCard'

export const CustodyManagement = () => {
  return (
    <Grid container direction='column'>
      <Grid item>
        <PageHeader title='Custody Management' />
        <VSpacer size={'small'} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} lg={4}>
        <InsightCard>
          <AccountsUnderCustody />
        </InsightCard>
        <VSpacer size={'medium'} />
      </Grid>
    </Grid>
  )
}
