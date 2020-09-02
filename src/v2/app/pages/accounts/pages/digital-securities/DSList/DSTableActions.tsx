import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { AssetBalance } from 'v2/types/balance'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digital-securities/router'

interface DSTableActionsProps {
  item: AssetBalance
}

export const DSTableActions: React.FC<DSTableActionsProps> = props => {
  const { routes } = useDSRouter()
  const { item } = props

  return (
    <ButtonGroup color='primary'>
      <Button>
        <AppRouterLink to={routes.view} params={{ balanceId: item._id }}>
          View
        </AppRouterLink>
      </Button>
      <Button>
        <AppRouterLink to={routes.deposit} params={{ balanceId: item._id }}>
          Deposit
        </AppRouterLink>
      </Button>
      <Button>
        <AppRouterLink to={routes.withdraw} params={{ balanceId: item._id }}>
          Withdraw
        </AppRouterLink>
      </Button>
    </ButtonGroup>
  )
}
