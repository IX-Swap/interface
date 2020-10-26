import React from 'react'
import { AppRouterLinkComponent } from 'v2/components/AppRouterLink'
import { Button } from '@material-ui/core'
import { useIssuanceRouter } from 'v2/app/pages/issuance/router'

export const DSOBackButton = () => {
  const { paths, params } = useIssuanceRouter()

  return (
    <Button component={AppRouterLinkComponent} to={paths.view} params={params}>
      Cancel
    </Button>
  )
}
