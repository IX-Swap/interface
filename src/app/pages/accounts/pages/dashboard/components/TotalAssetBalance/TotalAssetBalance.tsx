import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './TotalAssetBalance.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'
import { getTextWithOrWithoutColon } from 'helpers/strings'
import { useStyles as useSharedStyles } from 'app/pages/accounts/pages/dashboard/components/shared.styles'

export interface TotalAssetBalanceProps {
  value: number
}

export const TotalAssetBalance = ({ value }: TotalAssetBalanceProps) => {
  const classes = useStyles()
  const sharedClasses = useSharedStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={sharedClasses.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          {getTextWithOrWithoutColon('Total Asset Balance', isMobile)}
        </Typography>
      </Grid>
      <VSpacer size={'extraSmall'} />
      <Grid item className={classes.secondBlock}>
        <Typography variant={'body1'} className={classes.value}>
          US$ {formatAmount(value)}
        </Typography>
      </Grid>
    </Grid>
  )
}

TotalAssetBalance.defaultProps = {
  value: 0
}
