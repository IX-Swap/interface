import React from 'react'
import { Box, Grid, IconButton, Typography } from '@mui/material'
import { useStyles } from 'app/pages/accounts/pages/dashboard/components/BlockchainWalletsCount/BlockchainWalletsCount.styles'
import { VSpacer } from 'components/VSpacer'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddressesRoute as paths } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { Launch as LaunchIcon } from '@mui/icons-material'
import { useAppBreakpoints } from 'hooks/useAppBreakpoints'
import { getTextWithOrWithoutColon } from 'helpers/strings'

export interface BlockchainWalletsCountProps {
  count: number
}

export const BlockchainWalletsCount = ({
  count
}: BlockchainWalletsCountProps) => {
  const classes = useStyles()
  const { isMobile } = useAppBreakpoints()

  return (
    <Grid item className={classes.wrapper}>
      <Grid item className={classes.firstBlock}>
        <Typography
          variant={'subtitle2'}
          className={classes.label}
          data-testid={'title'}
        >
          {getTextWithOrWithoutColon('Blockchain Wallets', isMobile)}
          <Box className={classes.iconBlock}>
            <IconButton
              component={AppRouterLinkComponent}
              to={paths.list}
              size='small'
            >
              <LaunchIcon className={classes.icon} />
            </IconButton>
          </Box>
        </Typography>
      </Grid>

      <VSpacer size={'extraSmall'} />

      <Grid item className={classes.secondBlock}>
        <Typography
          variant={'body1'}
          className={classes.value}
          data-testid={'count'}
        >
          {count}
        </Typography>
      </Grid>
    </Grid>
  )
}

BlockchainWalletsCount.defaultProps = {
  count: 0
}
