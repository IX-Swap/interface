import { Box } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/PairTable/PairTable.styles'
import React from 'react'
import { formatAmount } from 'helpers/numbers'
import clsx from 'clsx'

export interface LastPriceProps {
  value: number
  isPositive?: boolean
}

export const LastPrice = ({ value, isPositive }: LastPriceProps) => {
  const { trendColor, centered } = useStyles({ isPositive })
  return (
    <Box component='span' className={clsx(trendColor, centered)}>
      {formatAmount(value)}
    </Box>
  )
}
