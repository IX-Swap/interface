import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { useIssuanceRouter } from 'app/pages/issuance/router'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { DonutChart } from 'app/pages/issuance/components/IssuanceLanding/DonutChart'
import { getDSOStats } from 'app/components/DSO/utils'

export const AmountRaised = () => {
  const {
    params: { dsoId }
  } = useIssuanceRouter()
  const { data, isSuccess } = useDSOById(dsoId)

  let value = LOADING_TEXT

  if (data === undefined) {
    value = abbreviateNumber(0)
  }

  if (isSuccess && data !== undefined) {
    value = abbreviateNumber(data.insight.raisedTotal, data.currency.symbol)
  }

  const percentRaised = data !== undefined ? getDSOStats(data).percentRaised : 0

  return (
    <ChartWrapper>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle title='Amount Raised' small />
          <InsightValue value={value} />
        </Grid>
        <Grid item>
          <DonutChart percent={percentRaised} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
