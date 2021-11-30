import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { Actions } from './components/Actions/Actions'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useActivitySummary } from 'app/pages/accounts/hooks/useActivitySummary'
import { OpenPositionTable } from 'app/pages/accounts/pages/reports/components/OpenPositionTable/OpenPositionTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { CashReportTable } from 'app/pages/accounts/pages/reports/components/CashReportTable/CashReportTable'

export const AccountsSummary: React.FC = () => {
  const { data, isLoading } = useActivitySummary()

  const hasOpenPositionsTotal =
    data !== undefined &&
    data.openPositions !== undefined &&
    data.openPositions.length > 0

  const hasCashReports = data !== undefined && data.cashReports !== undefined

  if (isLoading) {
    return <LoadingIndicator />
  }

  if (!hasOpenPositionsTotal && !hasCashReports) {
    // TODO Add UI for state without any data
    return null
  }

  const { openPositions, openPositionsTotal, cashReports } = data

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

        {hasOpenPositionsTotal && (
          <ReportsAccordion summary={'Open Positions'}>
            <OpenPositionTable
              openPositions={openPositions}
              openPositionsTotal={openPositionsTotal}
            />
          </ReportsAccordion>
        )}

        {hasCashReports && (
          <ReportsAccordion summary={'Cash Report'}>
            <CashReportTable data={cashReports} />
          </ReportsAccordion>
        )}
      </Grid>
    </Grid>
  )
}
