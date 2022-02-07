import React from 'react'
import { Box } from '@mui/material'
import { abbreviateNumber } from 'helpers/numbers'

export interface PriceWithCurrencyProps {
  price: number
  currency: string
}

export const PriceWithCurrency: React.FC<PriceWithCurrencyProps> = ({
  price,
  currency
}: PriceWithCurrencyProps) => {
  return (
    <Box
      component='span'
      style={{
        whiteSpace: 'nowrap',
        textAlign: 'right',
        width: '100%',
        fontWeight: 'bold'
      }}
    >
      {abbreviateNumber(price, currency)}
    </Box>
  )
}
