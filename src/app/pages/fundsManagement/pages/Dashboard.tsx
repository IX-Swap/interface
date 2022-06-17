import React from 'react'
import { Grid, Typography } from '@mui/material'
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
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'
import { RootContainer } from 'ui/RootContainer'

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
  const subfunds = getFilterValue('subfunds')
  const isStatusClosed = status === 'Closed'
  const hasSubfunds = subfunds !== undefined

  return (
    <Grid container spacing={3} style={{ display: 'table' }}>
      <Grid item xs={12}>
        <PageHeader title='InvestaX Digital Fund VCC' />
      </Grid>

      <Grid item xs={12} pl={3}>
        <RootContainer>
          <VSpacer size={'medium'} />
          <DSOFilters />
          <VSpacer size={'medium'} />
        </RootContainer>
      </Grid>

      {hasSubfunds && !isSubFundStatsLoading && (
        <>
          <Grid item container pl={3}>
            <RootContainer>
              <DSOCards />
            </RootContainer>
          </Grid>

          <Grid item container pl={3}>
            <RootContainer>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {isStatusClosed ? (
                    <AssetsUnderManagement
                      isLoading={isSubFundStatsLoading}
                      assets={subFundStatsData?.assetsUnderManagement}
                    />
                  ) : (
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
            </RootContainer>
          </Grid>

          {!isStatusClosed && (
            <Grid item xs={12} pl={3}>
              <RootContainer>
                <InvestorsChart
                  investmentStats={subFundInvestmentStatsData}
                  isLoading={isSubFundInvestmentStatsLoading}
                />
              </RootContainer>
            </Grid>
          )}
        </>
      )}

      {isSubFundStatsLoading && <LoadingIndicator />}
      {!hasSubfunds && !isSubFundStatsLoading && (
        <RootContainer>
          <Typography variant='subtitle1'>You have no subfunds</Typography>
        </RootContainer>
      )}
    </Grid>
  )
}
