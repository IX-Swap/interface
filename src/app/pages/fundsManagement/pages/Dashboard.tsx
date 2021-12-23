import React from 'react'
import { Grid } from '@material-ui/core'
import { DSOFilters } from 'app/pages/issuance/components/DSOFilters/DSOFilters'
import { DSOCards } from 'app/pages/issuance/components/DSOCards'
import { AssetsUnderManagement } from 'app/pages/issuance/components/AssetsUnderManagement/AssetsUnderManagement'
import { TopInvestorsTable } from 'app/pages/issuance/components/TopInvestorsTable/TopInvestorsTable'
import { InvestmentsOverview } from 'app/pages/issuance/components/InvestmentsOverview/InvestmentsOverview'
import { InvestorsChart } from 'app/pages/issuance/components/InvestorsChart/InvestorsChart'
import { useVCCFundStats } from 'app/pages/issuance/hooks/useVCCFundStats'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { VSpacer } from 'components/VSpacer'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const Dashboard = () => {
  const {
    subFundInvestmentStats: {
      data: subFundInvestmentStatsData,
      isLoading: isSubFundInvestmentStatsLoading
    },
    subFundStats: { data: subFundStatsData, isLoading: isSubFundStatsLoading }
  } = useVCCFundStats()
  const { getFilterValue } = useQueryFilter()
  const status = getFilterValue('status')
  const isStatusClosed = status === 'Closed'

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PageHeader title='InvestaX Digital Fund VCC' />
      </Grid>

      <Grid item xs={12}>
        <DSOFilters />
        <VSpacer size={'medium'} />
      </Grid>

      <Grid item container>
        <DSOCards />
      </Grid>

      <Grid item container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {isStatusClosed ? (
              <AssetsUnderManagement
                isLoading={isSubFundStatsLoading}
                assets={subFundStatsData?.assetsUnderManagement}
              />
            ) : (
              // TODO Change assetsUnderManagement field name to investmentsOverview or how it will be after update backend api
              <InvestmentsOverview
                isLoading={isSubFundStatsLoading}
                investments={subFundStatsData?.assetsUnderManagement}
              />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TopInvestorsTable
              isLoading={isSubFundStatsLoading}
              investors={subFundStatsData?.topInvestors}
              title={
                isStatusClosed
                  ? 'Top Investors From Closed'
                  : 'Top Investors Open Deals'
              }
            />
          </Grid>
        </Grid>
      </Grid>

      {!isStatusClosed && (
        <Grid item xs={12}>
          <InvestorsChart
            investmentStats={subFundInvestmentStatsData}
            isLoading={isSubFundInvestmentStatsLoading}
          />
        </Grid>
      )}
    </Grid>
  )
}
