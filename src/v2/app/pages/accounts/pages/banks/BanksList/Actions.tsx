import { Bank } from 'v2/types/bank'
import { Button, ButtonGroup } from '@material-ui/core'
import React from 'react'
import { useBanksRouter } from 'v2/app/pages/accounts/pages/banks/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export interface ActionsProps {
  item: Bank
}

export const Actions: React.FC<ActionsProps> = props => {
  const { item } = props
  const { paths } = useBanksRouter()

  return (
    <ButtonGroup color='primary'>
      <Button>
        <AppRouterLink to={paths.edit} params={{ bankId: item._id }}>
          Edit
        </AppRouterLink>
      </Button>
      <Button>
        <AppRouterLink to={paths.view} params={{ bankId: item._id }}>
          View
        </AppRouterLink>
      </Button>
    </ButtonGroup>
  )
}
