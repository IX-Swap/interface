import React from 'react'
import { Box, Grid, GridProps, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'
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
  custom: 600,
  normal: 700,
  bold: 900
}

export const valueWeightMap = {
  default: 400,
  thin: 500,
  custom: 600,
  normal: 700,
  bold: 900
}

export type TextAlignment = 'left' | 'right' | 'center' | 'justify'
export type LabelColor = 'default' | 'light' | 'dark' | 'gray' | 'bright'
export interface LabelledValueProps {
  label: string
  value: any
  row?: boolean
  reverse?: boolean
  valueWeight?: keyof typeof valueWeightMap
  labelWeight?: keyof typeof labelWeightMap
  labelFontSize?: number
  valueFontSize?: number
  align?: TextAlignment
  labelColor?: LabelColor
  valueColor?: string
  isNewThemeOn?: boolean
  isRedesigned?: boolean
}

export const LabelledValue = (props: LabelledValueProps & GridProps) => {
  const {
    label,
    value: val,
    row = false,
    reverse = false,
    valueWeight = 'default',
    labelWeight = 'normal',
    labelFontSize = 16,
    valueFontSize = 24,
    align = 'left',
    labelColor = 'default',
    valueColor,
    isNewThemeOn = false,
    isRedesigned = false,
    ...rest
  } = props
  const direction = row ? 'row' : 'column'

  const theme = useTheme()

  const labelColorMap = {
    default: theme.palette.text.primary,
    // @ts-expect-error
    light: theme.palette.text.hint,
    dark: 'rgba(255,255,255,.7)',
    gray: theme.palette.text.secondary,
    bright: theme.palette.switch.color
  }

  const items: Array<{ text: string; styles: React.CSSProperties }> = [
    {
      text: label,
      styles: {
        fontWeight: isRedesigned ? 500 : labelWeightMap[labelWeight],
        fontSize: reverse ? labelFontSize : undefined,
        width: '100%',
        color: isNewThemeOn
          ? theme.palette.slider.activeColor
          : labelColorMap[labelColor]
      }
    },
    {
      text: formatValue(val),
      styles: {
        fontWeight: isRedesigned ? 500 : valueWeightMap[valueWeight],
        fontSize: reverse ? valueFontSize : undefined,
        color: valueColor ?? undefined,
        opacity: isNewThemeOn ? 0.6 : 1,
        width: '100%',
        wordBreak: 'break-word'
      }
    }
  ]

  const [first, last] = reverse ? items.reverse() : items

  return (
    <Grid {...rest} item container direction={direction}>
      <Typography
        style={first.styles}
        color={isRedesigned ? 'text.primary' : undefined}
      >
        {first.text}
        {row && !reverse && ':'}
      </Typography>
      {row ? <Box px={0.5} /> : null}
      {!row && !reverse ? <Box py={isRedesigned ? 0.75 : 0.4} /> : null}
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
        <Typography
          style={last.styles}
          align={align}
          color={isRedesigned ? 'text.secondary' : undefined}
        >
          {last.text}
        </Typography>
      )}
    </Grid>
  )
}
