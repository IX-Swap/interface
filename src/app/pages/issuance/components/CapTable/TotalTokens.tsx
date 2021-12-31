import React from 'react'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { useParams } from 'react-router-dom'
import { useDSOById } from 'app/pages/invest/hooks/useDSOById'
import { formatAmount } from 'helpers/numbers'
import { VSpacer } from 'components/VSpacer'
import { LabelIcon } from 'app/pages/issuance/components/CapTable/LabelIcon'
import TotalTokensIcon from 'assets/icons/generating_tokens_black_24dp.svg'

export const TotalTokens = () => {
  const { dsoId, issuerId } = useParams<{ dsoId: string; issuerId: string }>()
  const { data } = useDSOById(dsoId, issuerId)

  let value = formatAmount(0)

  if (data !== undefined) {
    value = formatAmount((data.insight?.raisedTotal ?? 0) / data.pricePerUnit)
  }

  return (
    <ChartWrapper py={2.5}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle
            title='Total Tokens'
            small
            icon={
              <LabelIcon
                bgColor='#F2F2FE'
                icon={
                  <TotalTokensIcon
                    style={{ fill: '#8084F7', width: 16, height: 16 }}
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
