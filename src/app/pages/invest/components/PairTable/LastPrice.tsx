import { Box } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/PairTable/PairTable.styles'
import React from 'react'
import { formatAmount } from 'helpers/numbers'

export interface LastPriceProps {
  value: number
  isPositive?: boolean
}

export const LastPrice = ({ value, isPositive }: LastPriceProps) => {
  const { trendColor } = useStyles({ isPositive })
  return (
    <Box component='span' className={trendColor}>
      {formatAmount(value)}
    </Box>
  )
}
