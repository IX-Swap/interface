import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { useStyles } from './AvailableCash.styles'
import { VSpacer } from 'components/VSpacer'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { formatAmount } from 'helpers/numbers'
import { VirtualAccountInfo } from 'types/portfolio'
import classnames from 'classnames'

export interface AvailableCashProps {
  accounts: VirtualAccountInfo[] | undefined
}

export const AvailableCash = ({ accounts }: AvailableCashProps) => {
  const classes = useStyles()
  const { isMobile, isTablet } = useAppBreakpoints()

  if (accounts === undefined) {
    return null
  }

  const getCurrencySymbol = (currency: string) => {
    if (currency === 'SGD') {
      return 'S$'
    }
    return 'US$'
  }

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
        {accounts.map(({ currency, balance }, i) => {
          return (
            <Grid item key={balance.toString() + currency}>
              <Typography
                variant={'body1'}
                className={classnames(classes.value, {
                  [classes.space]: accounts.length - 1 !== i && !isTablet
                })}
              >
                {getCurrencySymbol(currency)} {formatAmount(balance)}
              </Typography>
            </Grid>
          )
        })}
      </Grid>
    </Grid>
  )
}
