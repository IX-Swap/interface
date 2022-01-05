import React from 'react'
import { Grid } from '@material-ui/core'
import { ChartTitle } from 'app/pages/issuance/components/IssuanceLanding/ChartTitle'
import { ChartWrapper } from 'app/pages/issuance/components/IssuanceLanding/ChartWrapper'
import { InsightValue } from 'app/pages/issuance/components/IssuanceLanding/InsightValue'
import { VSpacer } from 'components/VSpacer'

export interface DSOCardProps {
  value: number | undefined
  icon: JSX.Element
  title: string
}

export const DSOCard = ({ value, icon, title }: DSOCardProps) => {
  return (
    <ChartWrapper py={2.5}>
      <Grid container justifyContent='space-between' alignItems='center'>
        <Grid item>
          <ChartTitle title={title} icon={icon} />
          <VSpacer size='extraSmall' />
          <InsightValue value={value ?? 0} />
        </Grid>
      </Grid>
    </ChartWrapper>
  )
}
