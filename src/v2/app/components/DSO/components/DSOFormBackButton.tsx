import React from 'react'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { Button } from '@material-ui/core'

export const DSOFormBackButton = () => {
  const { paths, current, params } = useIssuanceRouter()
  const to = current.path === paths.create ? paths.list : paths.view

  return (
    <Button
      component={AppRouterLinkComponent}
      variant='contained'
      disableElevation
      to={to}
      params={params}
    >
      Cancel
    </Button>
  )
}
