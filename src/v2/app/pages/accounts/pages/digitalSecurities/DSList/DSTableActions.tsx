import React from 'react'
import { Button, ButtonGroup } from '@material-ui/core'
import { AssetBalance } from 'v2/types/balance'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { useDSRouter } from 'v2/app/pages/accounts/pages/digitalSecurities/router'

interface DSTableActionsProps {
  item: AssetBalance
}

export const DSTableActions = ({ item }: DSTableActionsProps) => {
  const { paths } = useDSRouter()

  return (
    <ButtonGroup size='small'>
      {/* <Button */}
      {/*  component={AppRouterLinkComponent} */}
      {/*  to={paths.view} */}
      {/*  params={{ balanceId: item.assetId }} */}
      {/* > */}
      {/*  View */}
      {/* </Button> */}
      <Button
        component={AppRouterLinkComponent}
        to={paths.deposit}
        params={{ balanceId: item.assetId }}
      >
        Deposit
      </Button>
      <Button
        component={AppRouterLinkComponent}
        to={paths.withdraw}
        params={{ balanceId: item.assetId }}
      >
        Withdraw
      </Button>
    </ButtonGroup>
  )
}
