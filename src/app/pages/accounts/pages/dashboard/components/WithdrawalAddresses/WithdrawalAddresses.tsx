import React from 'react'
import { Box, Grid, IconButton, Typography } from '@material-ui/core'
import { useStyles } from './WithdrawalAddresses.styles'
import { VSpacer } from 'components/VSpacer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesRoute as paths } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'

export interface WithdrawalAddressesProps {
  number: number
}

export const WithdrawalAddresses = ({ number }: WithdrawalAddressesProps) => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={classes.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography variant={'subtitle2'} className={classes.label}>
          Withdrawal Addresses
          {isMobile ? ':' : ''}
          <Box className={classes.iconBlock}>
            <IconButton
              component={AppRouterLinkComponent}
              to={paths.view}
              params={{ withdrawalAddressId: number }}
              size='small'
            >
              <LaunchIcon className={classes.icon} />
            </IconButton>
          </Box>
        </Typography>
      </Grid>

      <VSpacer size={'extraSmall'} />

      <Grid item className={classes.secondBlock}>
        <Typography variant={'body1'} className={classes.value}>
          {number}
        </Typography>
      </Grid>
    </Grid>
  )
}
