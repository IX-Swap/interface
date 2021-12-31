import React from 'react'
import { Box, Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { DonutChart } from 'app/pages/issuance/components/IssuanceLanding/DonutChart'
import { VSpacer } from 'components/VSpacer'
import { FundraiseTooltip } from 'app/pages/issuance/components/IssuanceLanding/FundraiseTooltip'
import AmountsRaisedIcon from 'assets/icons/payments_black_24dp.svg'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'

export interface AmountRaisedCardProps {
  isNewThemeOn?: boolean
  showFundraiseTooltip?: boolean
  showIcon?: boolean
  value: string
  total: string
  percentRaised: number
  small?: boolean
}

export const AmountRaisedCard = ({
  isNewThemeOn = false,
  showFundraiseTooltip = false,
  showIcon = false,
  value,
  total,
  percentRaised,
  small = true
}: AmountRaisedCardProps) => {
  return (
    <ChartWrapper py={isNewThemeOn ? 2.5 : undefined}>
      <Grid container justify='space-between' alignItems='center' wrap='nowrap'>
        <Grid item>
          <ChartTitle
            title='Amount Raised'
            small={small}
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
