import { Grid } from '@material-ui/core'
import { ChangeSummaryValue } from 'app/pages/exchange/components/FinancialSummary/ChangeSummaryValue'
import { MoreDetails } from 'app/pages/exchange/components/FinancialSummary/MoreDetails'
import { NumberSummaryValue } from 'app/pages/exchange/components/FinancialSummary/NumberSummaryValue'
import { SummaryItem } from 'app/pages/exchange/components/FinancialSummary/SummaryItem'
import { PairListDropdown } from 'app/pages/exchange/components/PairListDropdown/PairListDropdown'
import { useFinancialSummary } from 'app/pages/exchange/hooks/useFinancialSummary'
import React from 'react'
import { useParams } from 'react-router'

export const FinancialSummary = () => {
  const { pairId } = useParams<{
    pairId: string
  }>()
  const { data } = useFinancialSummary(pairId)

  return (
    <Grid container spacing={1}>
      <Grid item container xs={12} md={3} alignContent='center'>
        <PairListDropdown pairName={data?.name} />
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
              label='24H Volume (SGD)'
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
