import { Box } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/PairTable/PairTable.styles'
import React from 'react'
import { formatAmount } from 'helpers/numbers'
import clsx from 'clsx'

export interface LastPriceProps {
  value: number
  isPositive?: boolean
}

export const Change = ({ value, isPositive }: LastPriceProps) => {
  const { trendColor, centered } = useStyles({ isPositive })

  return (
    <Box component='span' className={clsx(trendColor, centered)}>
      {isPositive === true ? '+' : ''}
      {formatAmount(value)} %
    </Box>
  )
}
