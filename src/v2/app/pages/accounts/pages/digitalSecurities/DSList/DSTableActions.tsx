import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { AssetBalance } from 'v2/types/balance'
import { AppRouterLink } from 'v2/components/AppRouterLink'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'

interface DSTableActionsProps {
  item: AssetBalance
}

export const DSTableActions: React.FC<DSTableActionsProps> = props => {
  const { paths } = useDSRouter()
  const { item } = props

  return (
    <ButtonGroup color='primary'>
      <Button>
        <AppRouterLink to={paths.view} params={{ balanceId: item.assetId }}>
          View
        </AppRouterLink>
      </Button>
      <Button>
        <AppRouterLink to={paths.deposit} params={{ balanceId: item.assetId }}>
          Deposit
        </AppRouterLink>
      </Button>
      <Button>
        <AppRouterLink to={paths.withdraw} params={{ balanceId: item.assetId }}>
          Withdraw
        </AppRouterLink>
      </Button>
    </ButtonGroup>
  )
}
