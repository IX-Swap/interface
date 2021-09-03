import React from 'react'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { LOADING_TEXT } from 'components/form/renderUtils'
import { Box, Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { DonutChart } from 'app/pages/issuance/components/IssuanceLanding/DonutChart'
import { getDSOStats } from 'app/components/DSO/utils'
import { useParams } from 'react-router-dom'
import { VSpacer } from 'components/VSpacer'
import { FundraiseTooltip } from 'app/pages/issuance/components/IssuanceLanding/FundraiseTooltip'
import { ReactComponent as AmountsRaisedIcon } from 'assets/icons/payments_black_24dp.svg'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'

export interface AmountRaisedProps {
  isNewThemeOn?: boolean
  showFundraiseTooltip?: boolean
  showIcon?: boolean
}

export const AmountRaised = ({
  isNewThemeOn = false,
  showFundraiseTooltip = false,
  showIcon = false
}: AmountRaisedProps) => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data, isSuccess } = useDSOById(dsoId, issuerId)

  let value = LOADING_TEXT
  let total = LOADING_TEXT

  if (data === undefined || data.status === 'Draft') {
    value = abbreviateNumber(0)
    total = abbreviateNumber(0)
  }

  if (isSuccess && data !== undefined && data.status !== 'Draft') {
    value = abbreviateNumber(
      data.insight.raisedTotal,
      data.currency.symbol,
      false,
      undefined,
      isNewThemeOn
    )
    total = abbreviateNumber(
      data.totalFundraisingAmount,
      data.currency.symbol,
      false,
      undefined,
      isNewThemeOn
    )
  }

  const percentRaised = data !== undefined ? getDSOStats(data).percentRaised : 0

  return (
    <ChartWrapper py={isNewThemeOn ? 2.5 : undefined}>
      <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
        <Grid item>
          <ChartTitle
            title='Amount Raised'
            small
            icon={
              showIcon ? (
                <LabelIcon
                  bgColor='#FFE4E4'
                  icon={
                    <AmountsRaisedIcon
                      style={{ fill: '#F33E3E', width: 16, height: 12 }}
                    />
                  }
                />
              ) : undefined
            }
          />
          {isNewThemeOn ? <VSpacer size={'extraSmall'} /> : null}
          <InsightValue value={value} />
        </Grid>
        <Grid item>
          {showFundraiseTooltip ? (
            <FundraiseTooltip target={total} raised={value}>
              <Box>
                <DonutChart
                  percent={percentRaised}
                  isNewThemeOn={isNewThemeOn}
                />
              </Box>
            </FundraiseTooltip>
          ) : (
            <DonutChart percent={percentRaised} isNewThemeOn={isNewThemeOn} />
          )}
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
