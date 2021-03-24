import React from 'react'
import { Switch } from 'react-router-dom'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'
import { DeployToken } from 'app/pages/issuance/pages/DeployToken'
import { DSOList } from 'app/pages/issuance/pages/DSOList'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PreviewDSO } from 'app/pages/issuance/pages/PreviewDSO'
import { NewAppRoute } from 'components/NewAppRoute'

export const IssuanceRouter = () => {
  return (
    <Switch>
      <NewAppRoute
        breadcrumb='Create Digital Security Offering'
        exact
        path={IssuanceRoute.create}
      >
        <CreateDSO />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='View Digital Security Offering'
        exact
        path={IssuanceRoute.view}
      >
        <ViewDSO />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Edit Digital Security Offering'
        exact
        path={IssuanceRoute.edit}
      >
        <EditDSO />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Preview Digital Security Offering'
        exact
        path={IssuanceRoute.preview}
      >
        <PreviewDSO />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='Deploy Token'
        exact
        path={IssuanceRoute.deployToken}
      >
        <DeployToken />
      </NewAppRoute>

      <NewAppRoute
        breadcrumb='My Digital Security Offerings'
        exact
        path={IssuanceRoute.list}
      >
        <DSOList />
      </NewAppRoute>

      <NewAppRoute breadcrumb='Issuance' path={IssuanceRoute.insight}>
        <IssuanceLanding />
      </NewAppRoute>
    </Switch>
  )
}
