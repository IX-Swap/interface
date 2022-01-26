import { Box, Grid, Hidden } from '@mui/material'
import { ChangeSummaryValue } from 'app/pages/exchange/components/FinancialSummary/ChangeSummaryValue'
import { MoreDetails } from 'app/pages/exchange/components/FinancialSummary/MoreDetails'
import { NumberSummaryValue } from 'app/pages/exchange/components/FinancialSummary/NumberSummaryValue'
import { SummaryItem } from 'app/pages/exchange/components/FinancialSummary/SummaryItem'
import { PairListDropdown } from 'app/pages/exchange/components/PairListDropdown/PairListDropdown'
import { useFinancialSummary } from 'app/pages/exchange/hooks/useFinancialSummary'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { useAssetById } from 'hooks/asset/useAssetById'
import React from 'react'
import { useParams } from 'react-router-dom'

export const FinancialSummary = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)
  const { data: marketData } = useMarket(pairId)
  const { data: assetData } = useAssetById(
    marketData?.listing.markets[0].currency
  )

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} md={3}>
        <Box
          display='flex'
          justifyContent={{ xs: 'space-between', md: 'flex-start' }}
          alignItems='flex-start'
          padding={1}
        >
          <Box flexGrow={1} width={{ xs: '50%', md: '100%' }}>
            <PairListDropdown pairName={data?.name} />
          </Box>
          <Hidden mdUp>
            <Box
              flexGrow={1}
              width='50%'
              display='flex'
              justifyContent='flex-end'
            >
              <MoreDetails />
            </Box>
          </Hidden>
        </Box>
      </Grid>
      <Grid item xs={12} md={7}>
        <Box
          padding={{ xs: 1, md: 0 }}
          display={{ xs: 'grid', md: 'flex' }}
          justifyContent='space-between'
          gridTemplateColumns='1fr 1fr 1fr'
          gap={8}
        >
          <SummaryItem
            label='Last Trade Price'
            value={
              <NumberSummaryValue
                value={data?.latestPrice}
                isNegative={data?.latestPrice < 0}
              />
            }
          />
          <SummaryItem
            label='24H Change'
            value={
              <ChangeSummaryValue
                value={data?._24hChangePercentage}
                isNegative={data?._24hChangePercentage < 0}
              />
            }
          />
          <SummaryItem
            label='24H High'
            value={<NumberSummaryValue value={data?._24h.high} />}
          />
          <SummaryItem
            label='24H Low'
            value={<NumberSummaryValue value={data?._24h.low} />}
          />
          <SummaryItem
            label={`24H Volume (${assetData?.symbol ?? ''})`}
            value={<NumberSummaryValue value={data?._24h.volume} />}
          />
        </Box>
      </Grid>
      <Hidden mdDown>
        <Grid
          item
          container
          xs={12}
          md={2}
          alignContent='center'
          justifyContent='flex-end'
        >
          <MoreDetails />
        </Grid>
      </Hidden>
    </Grid>
  );
}
