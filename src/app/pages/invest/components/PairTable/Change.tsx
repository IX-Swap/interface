import { Box } from '@mui/material'
import { useStyles } from 'app/pages/invest/components/PairTable/PairTable.styles'
import React from 'react'
import { formatAmount } from 'helpers/numbers'

export interface LastPriceProps {
  value: number
  isPositive?: boolean
}

export const Change = ({ value, isPositive }: LastPriceProps) => {
  const { trendColor } = useStyles({ isPositive })

  return (
    <Box style={{marginLeft: '90px'}} component='span' className={trendColor}>
      {isPositive === true ? '+' : ''}
      {formatAmount(value)} %
    </Box>
  )
}
