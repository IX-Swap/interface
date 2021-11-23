import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'

export const AggregatedCostsAndCharges: React.FC = () => {
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <PageHeader title='Aggregated Costs and Charges' />
        <VSpacer size={'medium'} />
      </Grid>

      <ReportsInfo />

      <Grid item>
        <VSpacer size={'medium'} />
        Table
      </Grid>
    </Grid>
  )
}
