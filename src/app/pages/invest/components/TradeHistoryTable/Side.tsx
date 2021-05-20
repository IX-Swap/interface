import { Typography } from '@material-ui/core'
import { useStyles } from 'app/pages/invest/components/TradeHistoryTable/Side.styles'
import React from 'react'

export interface SideProps {
  side: 'BUY' | 'SELL'
}

export const Side = ({ side }: SideProps) => {
  const { sideColor } = useStyles({ side })
  return <Typography className={sideColor}>{side}</Typography>
}
