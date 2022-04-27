import { Typography } from '@mui/material'
import { useStyles } from 'app/pages/accounts/components/TradeHistoryTable/Side.styles'
import { getOrderSideName } from 'helpers/strings'
import React from 'react'
import { OrderSide } from 'types/order'

export interface SideProps {
  side: OrderSide
}

export const Side = ({ side }: SideProps) => {
  const { sideColor } = useStyles({ side })
  return <Typography className={sideColor}>{getOrderSideName(side)}</Typography>
}
