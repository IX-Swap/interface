import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { DonutChart } from 'app/pages/issuance/components/IssuanceLanding/DonutChart'
import { getDSOStats } from 'app/components/DSO/utils'
import { useParams } from 'react-router-dom'
import { VSpacer } from 'components/VSpacer'

export interface AmountRaisedProps {
  isNewThemeOn?: boolean
}

export const AmountRaised = ({ isNewThemeOn = false }: AmountRaisedProps) => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isSuccess } = useDSOById(dsoId, issuerId)

  let value = LOADING_TEXT

  if (data === undefined || data.status === 'Draft') {
    value = abbreviateNumber(0)
  }

  if (isSuccess && data !== undefined && data.status !== 'Draft') {
    value = abbreviateNumber(
      data.insight.raisedTotal,
      data.currency.symbol,
      false,
      undefined,
      isNewThemeOn
    )
  }

  const percentRaised = data !== undefined ? getDSOStats(data).percentRaised : 0

  return (
    <ChartWrapper py={2.5}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle title='Amount Raised' small />
          {isNewThemeOn ? <VSpacer size={'extraSmall'} /> : null}
          <InsightValue value={value} />
        </Grid>
        <Grid item>
          <DonutChart percent={percentRaised} isNewThemeOn={isNewThemeOn} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
