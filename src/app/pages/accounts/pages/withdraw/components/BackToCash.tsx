import { Button } from '@mui/material'
import { AccountsRoute } from 'app/pages/accounts/router/config'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import React from 'react'
import { Icon } from 'ui/Icons/Icon'
import { useStyles } from 'app/pages/accounts/pages/withdraw/components/BackToCash.styles'

export const BackToCash = () => {
  const { backText } = useStyles()
  return (
    <Button
      variant='text'
      className={backText}
      component={AppRouterLinkComponent}
      to={AccountsRoute.cash}
      startIcon={<Icon name='arrow-left' />}
    >
      Back to Cash page
    </Button>
  )
}
