import React from 'react'
import { Button } from '@material-ui/core'
import { WithdrawalAddressesRoute as paths } from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { WithdrawalAddress } from 'v2/types/withdrawalAddress'

export interface ActionsProps {
  item: WithdrawalAddress
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <Button
      component={AppRouterLinkComponent}
      to={paths.view}
      params={{ withdrawalAddressId: item._id }}
      size='small'
      variant='outlined'
    >
      View
    </Button>
  )
}
