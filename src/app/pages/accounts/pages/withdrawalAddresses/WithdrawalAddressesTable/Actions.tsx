import React from 'react'
import { Launch as LaunchIcon } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { WithdrawalAddressesRoute as paths } from 'app/pages/accounts/pages/withdrawalAddresses/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { WithdrawalAddress } from 'types/withdrawalAddress'

export interface ActionsProps {
  item: WithdrawalAddress
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <IconButton
      component={AppRouterLinkComponent}
      to={paths.view}
      params={{ withdrawalAddressId: item._id }}
      size='small'
    >
      <LaunchIcon color='disabled' />
    </IconButton>
  )
}
