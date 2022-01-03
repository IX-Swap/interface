import React from 'react'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { useParams } from 'react-router-dom'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { abbreviateNumber } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import { ReactComponent as MonetizationOnIcon } from 'assets/icons/monetization_on_black_24dp.svg'

export const PricePerToken = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)

  let value = abbreviateNumber(0)

  if (data !== undefined) {
    value = abbreviateNumber(
      data.pricePerUnit,
      data.currency.symbol,
      false,
      undefined,
      true
    )
  }

  return (
    <ChartWrapper py={2.5}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle
            title='Price per token'
            small
            icon={
              <LabelIcon
                bgColor='#EEF7F1'
                icon={
                  <MonetizationOnIcon
                    style={{ fill: '#93CF89', width: 15, height: 15 }}
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
