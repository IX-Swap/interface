import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useDividends } from 'app/pages/accounts/hooks/useDividends'
import { DividendsTable } from 'app/pages/accounts/pages/reports/components/DividendsTable/DividendsTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { NoData } from 'app/pages/accounts/pages/reports/components/NoData/NoData'

export const Dividends: React.FC = () => {
  const { data, isLoading } = useDividends()

  const renderContent = () => {
    if (data === undefined || data.length < 1) {
      return <NoData />
    }
    return (
      <ReportsAccordion summary={'Dividends'}>
        <DividendsTable data={data} />
      </ReportsAccordion>
    )
  }

  if (isLoading) {
    return <LoadingIndicator />
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
        {renderContent()}
      </Grid>
    </Grid>
  )
}
