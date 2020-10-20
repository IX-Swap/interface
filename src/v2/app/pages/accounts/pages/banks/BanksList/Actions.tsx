import { Bank } from 'v2/types/bank'
import { Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'

export interface ActionsProps {
  item: Bank
}

export const Actions: React.FC<ActionsProps> = props => {
  const { item } = props
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
