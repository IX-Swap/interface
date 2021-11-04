import React from 'react'
import { TopInfoPanel } from 'app/pages/accounts/pages/dashboard/components/TopInfoPanel/TopInfoPanel'
import { MarketPortfolio } from 'app/pages/accounts/pages/dashboard/components/MarketPortfolio/MarketPortfolio'
import { Grid } from '@material-ui/core'
import { VSpacer } from 'components/VSpacer'
import { useGetPortfolios } from 'app/pages/accounts/hooks/useGetPortfolios'
import { LoadingIndicator } from 'app/components/LoadingIndicator/LoadingIndicator'

export const Dashboard: React.FC = () => {
  const { data, isLoading } = useGetPortfolios()

  if (isLoading) {
    return <LoadingIndicator />
  }

  return (
    <Grid container direction={'column'}>
      <Grid item>
        <VSpacer size={'medium'} />
        <TopInfoPanel accounts={data?.accounts} balances={data?.balances} />
        <VSpacer size={'small'} />
        <VSpacer size={'extraSmall'} />
      </Grid>

      <Grid container>
        <Grid item xs={12}>
          <MarketPortfolio
            type={'primary'}
            currencySymbol={'US$'}
            marketInfo={data?.primaryMarket}
          />
        </Grid>
      </Grid>
    </Grid>
  )
}
