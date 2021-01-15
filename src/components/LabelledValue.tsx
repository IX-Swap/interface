import React from 'react'
import { Box, Grid, GridProps, Typography } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import { formatDateToMMDDYY } from 'helpers/dates'

const isDateTime = (value: string) => {
  return (
    value.match(
      /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
    ) !== null
  )
}

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

  if (typeof value === 'string' && isDateTime(value)) {
    return formatDateToMMDDYY(value)
  }

  return value
}

export const labelWeightMap = {
  default: 400,
  thin: 500,
  normal: 700,
  bold: 900
}

export const valueWeightMap = {
  default: 400,
  thin: 500,
  normal: 700,
  bold: 900
}

export type TextAlignment = 'left' | 'right' | 'center' | 'justify'
export interface LabelledValueProps {
  label: string
  value: any
  row?: boolean
  reverse?: boolean
  valueWeight?: keyof typeof valueWeightMap
  labelWeight?: keyof typeof labelWeightMap
  align?: TextAlignment
}

export const LabelledValue = (props: LabelledValueProps & GridProps) => {
  const {
    label,
    value: val,
    row = false,
    reverse = false,
    valueWeight = 'default',
    labelWeight = 'normal',
    align = 'left',
    ...rest
  } = props
  const direction = row ? 'row' : 'column'

  const theme = useTheme()

  const items = [
    {
      text: label,
      styles: {
        fontWeight: labelWeightMap[labelWeight],
        fontSize: reverse ? '16px' : undefined
      }
    },
    {
      text: formatValue(val),
      styles: {
        fontWeight: valueWeightMap[valueWeight],
        fontSize: reverse ? '24px' : undefined
      }
    }
  ]

  const [first, last] = reverse ? items.reverse() : items

  return (
    <Grid {...rest} item container direction={direction}>
      <Typography style={first.styles}>
        {first.text}
        {row && !reverse && ':'}
      </Typography>
      {row ? <Box px={0.5} /> : null}
      {!row && !reverse ? <Box py={0.4} /> : null}
      {React.isValidElement(last.text) ? (
        <Box
          style={{
            ...last.styles,
            textAlign: align,
            ...theme.typography.body1
          }}
        >
          {last.text}
        </Box>
      ) : (
        <Typography style={last.styles} align={align}>
          {last.text}
        </Typography>
      )}
    </Grid>
  )
}
