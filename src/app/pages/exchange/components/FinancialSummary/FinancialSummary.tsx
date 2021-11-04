import { Grid } from '@material-ui/core'
import { ChangeSummaryValue } from 'app/pages/exchange/components/FinancialSummary/ChangeSummaryValue'
import { MoreDetails } from 'app/pages/exchange/components/FinancialSummary/MoreDetails'
import { NumberSummaryValue } from 'app/pages/exchange/components/FinancialSummary/NumberSummaryValue'
import { SummaryItem } from 'app/pages/exchange/components/FinancialSummary/SummaryItem'
import { PairListDropdown } from 'app/pages/exchange/components/PairListDropdown/PairListDropdown'
import { useFinancialSummary } from 'app/pages/exchange/hooks/useFinancialSummary'
import { useMarket } from 'app/pages/exchange/hooks/useMarket'
import { useAssetById } from 'hooks/asset/useAssetById'
import React from 'react'
import { useParams } from 'react-router'
import { InvestRoute as paths } from 'app/pages/invest/router/config'
import { useStyles } from './FinancialSummary.styles'
import { AppRouterLink } from 'components/AppRouterLink'

export const FinancialSummary = () => {
  const { detailsLink } = useStyles({ isNegative: false })
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)
  const { data: marketData } = useMarket(pairId)
  const { data: assetData } = useAssetById(
    marketData?.listing.markets[0].currency
  )

  return (
    <Grid container spacing={1} style={{ paddingLeft: 11, paddingRight: 24 }}>
      <Grid
        item
        container
        xs={12}
        md={3}
        alignContent='center'
        alignItems={'center'}
      >
        <Grid item>
          <PairListDropdown pairName={data?.name} />
        </Grid>
        {marketData !== undefined ? (
          <Grid item>
            <AppRouterLink
              className={detailsLink}
              to={paths.viewListing}
              params={{
                userId: marketData.listing.createdBy,
                listingId: marketData.listing._id
              }}
            >
              View Details
            </AppRouterLink>
          </Grid>
        ) : null}
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container justify='space-between'>
          <Grid item>
            <SummaryItem
              label='Last Trade Price'
              value={
                <NumberSummaryValue
                  value={data?.latestPrice}
                  isNegative={data?.latestPrice < 0}
                />
              }
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H Change'
              value={
                <ChangeSummaryValue
                  value={data?._24hChangePercentage}
                  isNegative={data?._24hChangePercentage < 0}
                />
              }
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H High'
              value={<NumberSummaryValue value={data?._24h.high} />}
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H Low'
              value={<NumberSummaryValue value={data?._24h.low} />}
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label={`24H Volume (${assetData?.symbol ?? ''})`}
              value={<NumberSummaryValue value={data?._24h.volume} />}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={3}
        alignContent='center'
        justify='flex-end'
      >
        <MoreDetails />
      </Grid>
    </Grid>
  )
}
