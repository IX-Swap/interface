import { Box, Typography } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/FinancialSummary/FinancialSummary.styles'
import classNames from 'classnames'
import { formatAmount } from 'helpers/numbers'
import React from 'react'

export interface SummaryValueProps {
  value: number
  isNegative?: boolean
}

export const NumberSummaryValue = ({
  value,
  isNegative = false
}: SummaryValueProps) => {
  const { isNegativeColor, boldText } = useStyles({ isNegative })
  return (
    <Typography>
      <Box component='span' className={classNames([isNegativeColor, boldText])}>
        {formatAmount(value)}
      </Box>
    </Typography>
  )
}
