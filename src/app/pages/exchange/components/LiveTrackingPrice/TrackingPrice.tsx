import { Grid, Typography } from '@mui/material'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material'
import { useStyles } from 'app/pages/exchange/components/LiveTrackingPrice/TrackingPrice.styles'
import classNames from 'classnames'
import { formatAmount } from 'helpers/numbers'
import React from 'react'

export interface TrackingPriceProps {
  price: number
  trend: 'up' | 'down'
}

export const TrackingPrice = ({ price, trend }: TrackingPriceProps) => {
  const { root, colorStyle, arrow } = useStyles({ trend })
  return (
    <Grid container spacing={1} alignContent='center'>
      <Grid item>
        <Typography className={classNames(root, colorStyle)}>
          {formatAmount(price)}
        </Typography>
      </Grid>
      <Grid item>
        {trend === 'up' ? (
          <ArrowUpward className={classNames(colorStyle, arrow)} />
        ) : (
          <ArrowDownward className={classNames(colorStyle, arrow)} />
        )}
      </Grid>
    </Grid>
  )
}
