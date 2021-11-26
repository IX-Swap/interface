import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useExchangeFills } from 'app/pages/accounts/hooks/useExchangeFills'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { TradesTable } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesTable'

export const TradeConfirmation: React.FC = () => {
  const { data, isLoading } = useExchangeFills()
  console.log(data, isLoading)
  if (isLoading) {
    return <LoadingIndicator />
  }

  if (data === undefined) {
    return null
  }

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
          <TradesTable data={data} />
        </ReportsAccordion>
      </Grid>
    </Grid>
  )
}
