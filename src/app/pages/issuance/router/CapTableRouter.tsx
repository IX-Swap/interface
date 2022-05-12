import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { CapTable } from 'app/pages/issuance/pages/CapTable'
import { ManageDistributions } from 'app/pages/issuance/pages/ManageDistributions'
import { RootContainer } from 'ui/RootContainer'

export const CapTableRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='Manage Distributions'
        exact
        path={IssuanceRoute.manageDistributions}
      >
        <ManageDistributions />
      </AppRoute>
      )
      <AppRoute breadcrumb='Cap Table Management' path={IssuanceRoute.capTable}>
        <RootContainer>
          <CapTable />
        </RootContainer>
      </AppRoute>
    </Switch>
  )
}
