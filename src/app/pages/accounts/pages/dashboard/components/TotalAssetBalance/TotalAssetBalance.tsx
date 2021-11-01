import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from 'app/pages/accounts/pages/dashboard/components/TotalAssetBalance/TotalAssetBalance.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'

export interface TotalAssetBalanceProps {
  value: number
}

export const TotalAssetBalance = ({ value }: TotalAssetBalanceProps) => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={classes.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          Total Asset Balance
          {isMobile ? ':' : ''}
        </Typography>
      </Grid>
      <VSpacer size={'extraSmall'} />
      <Grid item className={classes.secondBlock}>
        <Typography variant={'body1'} className={classes.value}>
          S$ {formatAmount(value)}
        </Typography>
      </Grid>
    </Grid>
  )
}
