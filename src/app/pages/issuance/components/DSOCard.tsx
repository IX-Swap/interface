import React from 'react'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { VSpacer } from 'components/VSpacer'

export interface DSOCardProps {
  value: number
  icon: JSX.Element
}

export const DSOCard = ({ value, icon }: DSOCardProps) => {
  return (
    <ChartWrapper py={2.5}>
      <Grid container justify='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle title='Total DSOs' small icon={icon} />
          <VSpacer size='extraSmall' />
          <InsightValue value={value} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
