import React, { useEffect } from 'react'
import { Grid } from '@mui/material'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { ReportsInfo } from 'app/pages/accounts/pages/reports/components/ReportsInfo/ReportsInfo'
import { ReportsAccordion } from 'app/pages/accounts/pages/reports/components/ReportsAccordion/ReportsAccordion'
import { useFeeAndCharges } from 'app/pages/accounts/hooks/useFeeAndCharges'
import { FeesTable } from 'app/pages/accounts/pages/reports/components/FeesTable/FeesTable'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { NoData } from 'app/pages/accounts/pages/reports/components/NoData/NoData'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'
import { RootContainer } from 'ui/RootContainer'

export const AggregatedCostsAndCharges: React.FC = () => {
  const { data, isLoading } = useFeeAndCharges()
  const { updateFilter } = useQueryFilter()

  useEffect(() => {
    updateFilter('expandedSections', 'Fees (SGD),Fees (USD)')
  }, [])

  const hasSGDData = !!data?.sgd?.length
  const hasUSDData = !!data?.usd?.length

  const renderContent = () => {
    if (!hasSGDData && !hasUSDData) {
      return <NoData />
    }
    if (hasSGDData) {
      return (
        <ReportsAccordion summary={'Fees (SGD)'}>
          <FeesTable accounts={data.sgd} total={data.totalSgd} />
        </ReportsAccordion>
      )
    }

    if (hasUSDData) {
      return (
        <ReportsAccordion summary={'Fees (USD)'}>
          <FeesTable accounts={data.usd} total={data.totalUsd} />
        </ReportsAccordion>
      )
    }
  }

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid container direction={'column'} style={{ display: 'table' }}>
      <Grid item>
        <PageHeader title='Aggregated Costs and Charges' />
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