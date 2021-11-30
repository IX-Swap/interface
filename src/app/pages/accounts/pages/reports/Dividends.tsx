import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useDividends } from 'app/pages/accounts/hooks/useGetDistributionHistory'
import { DividendsTable } from 'app/pages/accounts/pages/reports/components/DividendsTable/DividendsTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const Dividends: React.FC = () => {
  const { data, isLoading } = useDividends()

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (data === undefined) {
    return null
  }

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
          <DividendsTable data={data} />
        </ReportsAccordion>
      </Grid>
    </Grid>
  )
}
