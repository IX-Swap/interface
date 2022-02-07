import { Box, Typography } from '@mui/material'
import React from 'react'

export interface CurrencyInfoProps {
  sgd: number
  usd: number
}

export const CurrencyInfo = (props: CurrencyInfoProps) => {
  return (
    <Box display='flex'>
      <Typography>
        <b style={{ color: '#8995FC' }}>{props.sgd}</b> SGD
      </Typography>

      <Box width={15} />

      <Typography>
        <b style={{ color: '#8995FC' }}>{props.usd}</b> USD
      </Typography>
    </Box>
  )
}
