import { Grid, Typography } from '@material-ui/core'
import { ArrowDownward, ArrowUpward } from '@material-ui/icons'
import { useStyles } from 'app/pages/invest/components/LiveTrackingPrice/LiveTrackingPrice.styles'
import classNames from 'classnames'
import React from 'react'

export interface LiveTrackingPriceProps {
  price: number
  trend: 'up' | 'down'
}

export const LiveTrackingPrice = ({ price, trend }: LiveTrackingPriceProps) => {
  const { root, colorStyle, arrow } = useStyles({ trend })
  return (
    <Grid container spacing={1} alignContent='center'>
      <Grid item>
        <Typography className={classNames(root, colorStyle)}>
          {price}
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
