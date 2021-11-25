import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { Actions } from './components/Actions/Actions'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'

export const AccountsSummary: React.FC = () => {
  return (
    <Grid container direction={'column'}>
      <Grid item>
        <PageHeader title='Activity Summary' />
        <VSpacer size={'medium'} />
      </Grid>

      <ReportsInfo>
        <Actions onContractClick={() => null} onExpandClick={() => null} />
      </ReportsInfo>

      <Grid item>
        <VSpacer size={'medium'} />

        <ReportsAccordion summary={'Open Positions'}>
          <div>Open Positions</div>
        </ReportsAccordion>

        <ReportsAccordion summary={'Cash Report'}>
          <div>Cash Report</div>
        </ReportsAccordion>
      </Grid>
    </Grid>
  )
}
