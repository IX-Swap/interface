import { Bank } from 'types/bank'
import { Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { BanksRoute } from 'app/pages/accounts/pages/banks/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface ActionsProps {
  item: Bank
}

export const Actions = ({ item }: ActionsProps) => {
  return (
    <ButtonGroup size='small'>
      <Button
        component={AppRouterLinkComponent}
        to={BanksRoute.edit}
        params={{ bankId: item._id }}
      >
        Edit
      </Button>
      <Button
        component={AppRouterLinkComponent}
        to={BanksRoute.view}
        params={{ bankId: item._id }}
      >
        View
      </Button>
    </ButtonGroup>
  )
}
