import React from 'react'
import { Box, Grid, GridProps, Typography } from '@material-ui/core'

const formatValue = (value: any): string => {
  const empty = '–'

  if (value === undefined || value === null) {
    return empty
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }

  if (typeof value === 'string' && value.length === 0) {
    return empty
  }

  return value
}

export const labelWeightMap = {
  thin: 500,
  normal: 700,
  bold: 900
}

export interface LabelledValueProps {
  label: string
  value: any
  row?: boolean
  labelWeight?: keyof typeof labelWeightMap
}

export const LabelledValue = (props: LabelledValueProps & GridProps) => {
  const { label, value, row = false, labelWeight = 'normal', ...rest } = props
  const direction = row ? 'row' : 'column'

  return (
    <Grid {...rest} item container direction={direction}>
      <Typography style={{ fontWeight: labelWeightMap[labelWeight] }}>
        {label}
        {row && ':'}
      </Typography>
      {row && <Box px={0.5} />}
      <Typography>{formatValue(value)}</Typography>
    </Grid>
  )
}
