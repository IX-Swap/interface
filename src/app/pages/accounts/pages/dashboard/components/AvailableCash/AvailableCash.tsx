import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from 'app/pages/accounts/pages/dashboard/components/AvailableCash/AvailableCash.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'

export interface AvailableCashProps {
  usd: number
  sgd: number
}

export const AvailableCash = ({ usd, sgd }: AvailableCashProps) => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={classes.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          Available Cash
          {isMobile ? ':' : ''}
        </Typography>
      </Grid>

      <VSpacer size={'extraSmall'} />

      <Grid
        item
        container
        justify={'space-between'}
        className={classes.secondBlock}
      >
        <Grid item>
          <Typography variant={'body1'} className={classes.value}>
            US$ {formatAmount(usd)}
          </Typography>
        </Grid>

        <Grid item className={classes.space} />

        <Grid item>
          <Typography variant={'body1'} className={classes.value}>
            S$ {formatAmount(sgd)}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
