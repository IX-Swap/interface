import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useGetDistributionHistory } from 'app/pages/accounts/hooks/useGetDistributionHistory'

export const Dividends: React.FC = () => {
  const { data, isLoading } = useGetDistributionHistory()
  console.log(data, isLoading)

  return (
    <Grid container direction={'column'}>
      <Grid item>
        <PageHeader title='Dividends' />
        <VSpacer size={'medium'} />
      </Grid>

      <ReportsInfo />

      <Grid item>
        <VSpacer size={'medium'} />

        <ReportsAccordion summary={'Dividends'}>
          <div>Dividends</div>
        </ReportsAccordion>
      </Grid>
    </Grid>
  )
}
