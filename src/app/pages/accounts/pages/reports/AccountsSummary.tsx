import React, { useEffect } from 'react'
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
import { NoData } from 'app/pages/accounts/pages/reports/components/NoData/NoData'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const AccountsSummary: React.FC = () => {
  const { updateFilter } = useQueryFilter()
  const { data, isLoading } = useActivitySummary()

  const hasOpenPositionsTotal = !!data?.openPositions?.length

  const hasCashReports = data?.cashReports !== undefined
  const hasNoData = !hasOpenPositionsTotal && !hasCashReports

  useEffect(() => {
    updateFilter('expandedSections', 'Open Positions,Cash Report')
  }, [])

  const renderContent = () => {
    if (hasNoData) {
      return <NoData />
    }

    const { openPositions, openPositionsTotal, cashReports } = data

    return (
      <>
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
      </>
    )
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid container direction={'column'}>
      <Grid item>
        <PageHeader title='Activity Summary' />
        <VSpacer size={'medium'} />
      </Grid>

      <ReportsInfo>
        {!hasNoData ? (
          <Actions sectionSummaries={['Open Positions', 'Cash Report']} />
        ) : undefined}
      </ReportsInfo>

      <Grid item>
        <VSpacer size={'medium'} />
        {renderContent()}
      </Grid>
    </Grid>
  )
}
