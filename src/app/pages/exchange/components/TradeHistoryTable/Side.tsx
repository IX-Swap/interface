import { Typography } from '@mui/material'
import { useStyles } from 'app/pages/exchange/components/TradeHistoryTable/Side.styles'
import React from 'react'

export interface SideProps {
  side: 'BID' | 'ASK'
}

export const Side = ({ side }: SideProps) => {
  const { sideColor } = useStyles({ side })
  return (
    <Typography className={sideColor}>
      {side === 'BID' ? 'SELL' : 'BUY'}
    </Typography>
  )
}
