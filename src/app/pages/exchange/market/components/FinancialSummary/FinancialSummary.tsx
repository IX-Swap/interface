import { Grid } from '@material-ui/core'
import { ChangeSummaryValue } from 'app/pages/exchange/market/components/FinancialSummary/ChangeSummaryValue'
import { MoreDetails } from 'app/pages/exchange/market/components/FinancialSummary/MoreDetails'
import { NumberSummaryValue } from 'app/pages/exchange/market/components/FinancialSummary/NumberSummaryValue'
import { SummaryItem } from 'app/pages/exchange/market/components/FinancialSummary/SummaryItem'
import { PairListDropdown } from 'app/pages/exchange/market/components/PairListDropdown/PairListDropdown'
import React from 'react'

export const FinancialSummary = () => {
  return (
    <Grid container spacing={1}>
      <Grid item container xs={12} md={3} alignContent='center'>
        <PairListDropdown pairName='IXPS/SGD' />
      </Grid>
      <Grid item xs={12} md={6}>
        <Grid container justify='space-between'>
          <Grid item>
            <SummaryItem
              label='Last Trade Price'
              value={<NumberSummaryValue value={9780.7} isNegative />}
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H Change'
              value={<ChangeSummaryValue value={-5.32} isNegative />}
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H High'
              value={<NumberSummaryValue value={9950.0} />}
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H Low'
              value={<NumberSummaryValue value={9200.0} />}
            />
          </Grid>
          <Grid item>
            <SummaryItem
              label='24H Volume (SGD)'
              value={<NumberSummaryValue value={1000000} />}
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
