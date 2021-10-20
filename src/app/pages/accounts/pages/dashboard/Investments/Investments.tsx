import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useStyles } from './Investments.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export const Investments: React.FC = () => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={classes.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          Investments
          {isMobile ? ':' : ''}
        </Typography>
      </Grid>

      <VSpacer size={'extraSmall'} />
      <Grid item container wrap={'nowrap'} className={classes.secondBlock}>
        <Grid item container alignItems={'center'} className={classes.item}>
          <Typography variant={'subtitle2'} className={classes.label}>
            Primary:
          </Typography>

          <Box width={6} />

          <Typography variant={'body1'} className={classes.value}>
            S$ 1,000,000.00
          </Typography>
        </Grid>

        <Grid item className={classes.space} />

        <Grid item container alignItems={'center'} className={classes.item}>
          <Typography variant={'subtitle2'} className={classes.label}>
            Secondary:
          </Typography>

          <Box width={6} />

          <Typography variant={'body1'} className={classes.value}>
            S$ 1,000,000.00
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
