import React from 'react'
import { Box, Grid, Typography } from '@material-ui/core'
import { useStyles } from './Investments.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'
import { getTextWithOrWithoutColon } from 'helpers/strings'
import { useStyles as useSharedStyles } from 'app/pages/accounts/pages/dashboard/components/shared.styles'

export interface InvestmentsProps {
  primary: number
  secondary?: number
}

export const Investments = ({ primary, secondary }: InvestmentsProps) => {
  const classes = useStyles()
  const sharedClasses = useSharedStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={sharedClasses.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          {getTextWithOrWithoutColon('Investments', isMobile)}
        </Typography>
      </Grid>

      <VSpacer size={'extraSmall'} />
      <Grid item container wrap={'nowrap'} className={classes.secondBlock}>
        <Grid
          item
          container
          alignItems={'center'}
          className={classes.item}
          data-testid={'primary-investment'}
        >
          <Typography variant={'subtitle2'} className={classes.label}>
            Primary:
          </Typography>

          <Box width={6} />

          <Typography variant={'body1'} className={classes.value}>
            US$ {formatAmount(primary)}
          </Typography>
        </Grid>

        {secondary !== undefined ? (
          <>
            <Grid item className={classes.space} />

            <Grid
              item
              container
              alignItems={'center'}
              className={classes.item}
              data-testid={'secondary-investment'}
            >
              <Typography variant={'subtitle2'} className={classes.label}>
                Secondary:
              </Typography>

              <Box width={6} />

              <Typography variant={'body1'} className={classes.value}>
                US$ {formatAmount(secondary)}
              </Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
    </Grid>
  )
}

Investments.defaultProps = { primary: 0 }
