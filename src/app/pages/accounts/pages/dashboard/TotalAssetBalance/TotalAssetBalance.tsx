import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './TotalAssetBalance.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const TotalAssetBalance: React.FC = () => {
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
          S$ 3,456,789.00
        </Typography>
      </Grid>
    </Grid>
  )
}
