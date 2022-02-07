import { Typography, Box } from '@mui/material'
import { formatMoney } from 'helpers/numbers'
import { ValidCurrency } from 'helpers/types'
import React from 'react'

export interface AvailableBalanceInfoProps {
  amount: number
  currency: ValidCurrency
}

export const AvailableBalanceInfo = ({
  amount,
  currency
}: AvailableBalanceInfoProps) => {
  return (
    <>
      <Box>
        <Typography variant='h5' style={{ color: '#fff' }}>
          {formatMoney(amount, '')}
        </Typography>
      </Box>
      <Box>
        <Typography style={{ fontSize: 12, color: '#fff', fontWeight: 500 }}>
          {currency}
        </Typography>
      </Box>
    </>
  )
}
