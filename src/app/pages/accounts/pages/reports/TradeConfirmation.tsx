import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useTradeConfirmation } from 'app/pages/accounts/hooks/useTradeConfirmation'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { TradesTable } from 'app/pages/accounts/pages/reports/components/TradesTable/TradesTable'
import { NoData } from 'app/pages/accounts/pages/reports/components/NoData/NoData'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { RootContainer } from 'ui/RootContainer'

export const TradeConfirmation = () => {
  const { updateFilter } = useQueryFilter()
  const { data, isLoading } = useTradeConfirmation()

  useEffect(() => {
    updateFilter('expandedSections', 'Trades')
  }, [])

  const renderContent = () => {
    if (data === undefined || data.length < 1) {
      return <NoData />
    }
    return (
      <ReportsAccordion summary={'Trades'}>
        <TradesTable data={data} />
      </ReportsAccordion>
    )
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid container direction={'column'} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Trade Confirmation' />
        <VSpacer size={'medium'} />
      </Grid>
      <RootContainer>
        <ReportsInfo />

        <Grid item>
          <VSpacer size={'medium'} />
          {renderContent()}
        </Grid>
      </RootContainer>
    </Grid>
  )
}
