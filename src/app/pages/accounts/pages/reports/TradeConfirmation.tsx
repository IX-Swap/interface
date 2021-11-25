import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'

export const TradeConfirmation: React.FC = () => {
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <PageHeader title='Trade Confirmation' />
        <VSpacer size={'medium'} />
      </Grid>

      <ReportsInfo />

      <Grid item>
        <VSpacer size={'medium'} />

        <ReportsAccordion summary={'Trades'}>
          <div>Trades</div>
        </ReportsAccordion>
      </Grid>
    </Grid>
  )
}
