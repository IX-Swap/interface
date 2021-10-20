import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './AvailableCash.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const AvailableCash: React.FC = () => {
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
            US$ 3,456,789.00
          </Typography>
        </Grid>

        <Grid item className={classes.space} />

        <Grid item>
          <Typography variant={'body1'} className={classes.value}>
            S$ 3,456,789.00
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
