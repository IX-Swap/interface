import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './AvailableCash.styles'
import { useStyles as useSharedStyles } from './../shared.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'
import { VirtualAccountInfo } from 'types/portfolio'
import { getTextWithOrWithoutColon } from 'helpers/strings'

export interface AvailableCashProps {
  accounts: VirtualAccountInfo[] | undefined
}

export const AvailableCash = ({ accounts }: AvailableCashProps) => {
  const classes = useStyles()
  const sharedClasses = useSharedStyles()
  const { isMobile } = useAppBreakpoints()

  if (accounts === undefined) {
    return null
  }

  const getCurrencySymbol = (currency: string) => {
    return currency === 'SGD' ? 'S$' : 'US$'
  }

  return (
    <Grid item className={sharedClasses.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          {getTextWithOrWithoutColon('Available Cash', isMobile)}
        </Typography>
      </Grid>

      <VSpacer size={'extraSmall'} />

      <Grid
        item
        container
        justify={'space-between'}
        className={classes.secondBlock}
      >
        {accounts.map(({ currency, balance }) => {
          return (
            <Typography
              variant={'body1'}
              className={classes.value}
              key={balance.toString() + currency}
            >
              {getCurrencySymbol(currency)} {formatAmount(balance)}
            </Typography>
          )
        })}
      </Grid>
    </Grid>
  )
}
