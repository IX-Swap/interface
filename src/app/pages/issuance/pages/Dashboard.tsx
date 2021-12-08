import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DSOFilters } from 'app/pages/issuance/components/DSOFilters/DSOFilters'
import { AssetsUnderManagement } from 'app/pages/issuance/components/AssetsUnderManagement'
import { TopInvestorsTable } from 'app/pages/issuance/components/TopInvestorsTable/TopInvestorsTable'

export const Dashboard = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='InvestaX Digital Fund VCC' />
      </Grid>
      <Grid item xs={12}>
        <DSOFilters />
      </Grid>
      <Grid item container xs={12} spacing={3}>
        <Grid item xs={12} md={6}>
          <AssetsUnderManagement />
        </Grid>
        <Grid item xs={12} md={6}>
          <TopInvestorsTable />
        </Grid>
      </Grid>
    </Grid>
  )
}
