import { Box } from '@material-ui/core'
import { useStyles } from 'app/pages/exchange/components/PairTable/PairTable.styles'
import React from 'react'
import { formatAmount } from 'helpers/numbers'

export interface LastPriceProps {
  value: number
  trend: 'up' | 'down'
}

export const Change = ({ value, trend }: LastPriceProps) => {
  const { trendColor } = useStyles({ trend })
  return (
    <Box component='span' className={trendColor}>
      +{formatAmount(value)} %
    </Box>
  )
}
