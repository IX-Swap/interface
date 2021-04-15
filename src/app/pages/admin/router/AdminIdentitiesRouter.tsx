import { Identities } from 'app/pages/admin/pages/Identities'
import { ViewCorporateIdentity } from 'app/pages/admin/pages/ViewCorporateIdentity'
import { ViewIndividualIdentity } from 'app/pages/admin/pages/ViewIndividualIdentity'
import { AdminRoute } from 'app/pages/admin/router/config'
import { AppRoute } from 'components/AppRoute'
import React from 'react'
import { Switch } from 'react-router'

export const AdminIdentitiesRouter = () => {
  return (
    <Switch>
      <AppRoute
        path={AdminRoute.viewIndividualIdentity}
        breadcrumb='View Individual Identity'
      >
        <ViewIndividualIdentity />
      </AppRoute>

      <AppRoute
        path={AdminRoute.viewCorporateIdentity}
        breadcrumb='View Corporate Identity'
      >
        <ViewCorporateIdentity />
      </AppRoute>

      <AppRoute path={'/'}>
        <Identities />
      </AppRoute>
    </Switch>
  )
}
