import React from 'react'
import { AppRouterLinkComponent } from 'components/AppRouterLink'
import { Button } from '@material-ui/core'
import { useIssuanceRouter } from 'app/pages/issuance/router'

export const DSOBackButton = () => {
  const { paths, params, current } = useIssuanceRouter()
  const to = current.path === paths.create ? paths.list : paths.view

  return (
    <Button component={AppRouterLinkComponent} to={to} params={params}>
      Cancel
    </Button>
  )
}
