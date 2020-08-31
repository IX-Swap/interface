import React from 'react'
import { observer } from 'mobx-react'
import { Button } from '@material-ui/core'
import { useBanksRouter } from 'v2/app/accounts/banks/router'
import { AppRouterLink } from 'v2/components/AppRouterLink'

export const CancelButton: React.FC = observer(() => {
  const { routes } = useBanksRouter()

  return (
    <Button color='default'>
      <AppRouterLink to={routes.list}>Cancel</AppRouterLink>
    </Button>
  )
})
