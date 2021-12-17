import React from 'react'
import { Grid } from '@material-ui/core'
import { PageHeader } from 'app/components/PageHeader/PageHeader'
import { DSOFilters } from 'app/pages/issuance/components/DSOFilters/DSOFilters'
import { VSpacer } from 'components/VSpacer'
import { DSOCards } from 'app/pages/issuance/components/DSOCards'
import { AssetsUnderManagement } from 'app/pages/issuance/components/AssetsUnderManagement'
import { useVCCFundStats } from 'app/pages/issuance/hooks/useVCCFundStats'
import { TopInvestorsTable } from 'app/pages/issuance/components/TopInvestorsTable/TopInvestorsTable'
import { InvestmentsOverview } from 'app/pages/issuance/components/InvestmentsOverview'
import { useQueryFilter } from 'hooks/filters/useQueryFilter'

export const Dashboard = () => {
  const { data } = useVCCFundStats()
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
              <AssetsUnderManagement assets={data?.assetsUnderManagement} />
            ) : (
              // TODO Change assetsUnderManagement field name to investmentsOverview or how it will be after update backend api
              <InvestmentsOverview investments={data?.assetsUnderManagement} />
            )}
          </Grid>

          <Grid item xs={12} md={6}>
            <TopInvestorsTable
              investors={data?.topInvestors}
              title={
                isStatusClosed
                  ? 'Top Investors From Closed'
                  : 'Top Investors Open Deals'
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
