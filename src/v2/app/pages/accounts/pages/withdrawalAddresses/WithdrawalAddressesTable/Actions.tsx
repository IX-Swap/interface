import { Bank } from 'v2/types/bank'
import { Button } from '@material-ui/core'
import React from 'react'
import { useWithdrawalAddressesRouter } from 'v2/app/pages/accounts/pages/withdrawalAddresses/router'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export interface ActionsProps {
  item: Bank
}

export const Actions: React.FC<ActionsProps> = props => {
  const { item } = props
  const { paths } = useWithdrawalAddressesRouter()

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
