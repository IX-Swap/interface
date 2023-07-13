import { Box, Grid, Button } from '@mui/material'
import { NumberSummaryValue } from 'app/pages/invest/components/FinancialSummary/NumberSummaryValue'
import { SummaryItem } from 'app/pages/invest/components/FinancialSummary/SummaryItem'
import { PairListDropdown } from 'app/pages/invest/components/PairListDropdown/PairListDropdown'
import { useFinancialSummary } from 'app/pages/invest/hooks/useFinancialSummary'
import { useMarket } from 'app/pages/invest/hooks/useMarket'
// import { useAssetById } from 'hooks/asset/useAssetById'
import React from 'react'
import { useParams } from 'react-router-dom'
import { InvestRoute as paths } from 'app/pages/invest/router/config'
import { ExchangeRulesLink } from '../ExchangeRulesLink/ExchangeRulesLink'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { AccountsRoute } from 'app/pages/accounts/router/config'

export const FinancialSummary = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)
  const { data: marketData } = useMarket(pairId)
  // const { data: assetData } = useAssetById(
  //   marketData?.listing?.markets[0]?.currency
  // )

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Box
          display='flex'
          justifyContent={{ xs: 'space-between', md: 'flex-start' }}
          alignItems='flex-start'
          padding={2}
        >
          {marketData !== undefined && (
            <Box flexGrow={1} width={{ xs: '50%', md: '100%' }}>
              <PairListDropdown
                pairName={data?.name}
                path={paths.viewListing}
                params={{
                  userId: marketData.listing.createdBy,
                  listingId: marketData.listing._id
                }}
              />
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} md={9}>
        <Box
          padding={{ xs: 1, md: 0 }}
          display={{ xs: 'grid', md: 'flex' }}
          justifyContent={{ xs: 'space-between', md: 'flex-start' }}
          gridTemplateColumns='1fr 1fr 1fr'
          gap={8}
          sx={{ marginTop: '21px' }}
        >
          <SummaryItem
            label='Last Price'
            value={
              <NumberSummaryValue
                value={data?.latestPrice}
                isNegative={data?.latestPrice < 0}
              />
            }
          />
          <SummaryItem
            // label={`24H Volume (${assetData?.symbol ?? ''})`}
            label='24H Volume'
            value={<NumberSummaryValue value={data?._24h.volume} />}
          />
          <SummaryItem
            label='24H High'
            value={<NumberSummaryValue value={data?._24h.high} />}
          />
          <SummaryItem
            label='24H Low'
            value={<NumberSummaryValue value={data?._24h.low} />}
          />
          <Grid item sx={{ marginTop: '12px' }}>
            <ExchangeRulesLink />
          </Grid>
          <Grid item xs={6} pb={3}>
            <Button
              component={AppRouterLinkComponent}
              size='large'
              color='primary'
              variant='contained'
              to={AccountsRoute.myHoldings}
            >
              My Exchange Holdings
            </Button>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}
