import React from 'react'
import { Box, Grid, GridProps, Typography } from '@material-ui/core'

export const valueWeightMap = {
  thin: 500,
  normal: 700,
  bold: 900
}

export interface DSOOfferLabelledValueProps {
  label: string
  value: any
  row?: boolean
  valueWeight?: keyof typeof valueWeightMap
}

export const DSOOfferLabelledValue = (
  props: DSOOfferLabelledValueProps & GridProps
) => {
  const { label, value, row = false, valueWeight = 'thin', ...rest } = props
  const direction = row ? 'row' : 'column'

  return (
    <Grid {...rest} item container direction={direction}>
      <Typography
        style={{ fontWeight: valueWeightMap[valueWeight], fontSize: '24px' }}
      >
        {value}
      </Typography>
      {row ? <Box px={0.4} /> : null}
      <Typography style={{ fontWeight: 400, fontSize: '16px' }}>
        {label}
      </Typography>
    </Grid>
  )
}
