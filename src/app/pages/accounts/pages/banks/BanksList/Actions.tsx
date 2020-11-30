import { Bank } from 'types/bank'
import { Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { useBanksRouter } from 'app/pages/accounts/pages/banks/router'
import { AppRouterLinkComponent } from 'components/AppRouterLink'

export interface ActionsProps {
  item: Bank
}

export const Actions = ({ item }: ActionsProps) => {
  const { paths } = useBanksRouter()

  return (
    <ButtonGroup size='small'>
      <Button
        component={AppRouterLinkComponent}
        to={paths.edit}
        params={{ bankId: item._id }}
      >
        Edit
      </Button>
      <Button
        component={AppRouterLinkComponent}
        to={paths.view}
        params={{ bankId: item._id }}
      >
        View
      </Button>
    </ButtonGroup>
  )
}
