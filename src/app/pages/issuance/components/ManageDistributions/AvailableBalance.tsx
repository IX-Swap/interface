import React from 'react'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { formatMoney } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import { ReactComponent as PaymentsIcon } from 'assets/icons/payments_black_24dp.svg'

export const AvailableBalance = () => {
  const value = formatMoney(172517, 'S$')

  return (
    <ChartWrapper py={2.5}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle
            title='Available Balance'
            small
            icon={
              <LabelIcon
                bgColor='#EEF7F1'
                icon={
                  <PaymentsIcon
                    style={{ fill: '#93CF89', width: 16, height: 16 }}
                  />
                }
              />
            }
          />
          <VSpacer size='extraSmall' />
          <InsightValue value={value} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
