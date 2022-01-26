import React from 'react'
import { Button, ButtonGroup } from '@mui/material'
import { AssetBalance } from 'types/balance'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { DSRoute } from 'app/pages/accounts/pages/digitalSecurities/router/config'

interface DSTableActionsProps {
  item: AssetBalance
}

export const DSTableActions = ({ item }: DSTableActionsProps) => {
  return (
    <ButtonGroup size='small'>
      <Button
        component={AppRouterLinkComponent}
        to={DSRoute.deposit}
        params={{ balanceId: item.assetId }}
      >
        Deposit
      </Button>
      <Button
        component={AppRouterLinkComponent}
        to={DSRoute.withdraw}
        params={{ balanceId: item.assetId }}
      >
        Withdraw
      </Button>
    </ButtonGroup>
  )
}
