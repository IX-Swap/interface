import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'
import { DeployToken } from 'app/pages/issuance/pages/DeployToken'
import { DSOList } from 'app/pages/issuance/pages/DSOList'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PreviewDSO } from 'app/pages/issuance/pages/PreviewDSO'

export const IssuanceRouter = () => {
  return (
    <Switch>
      <Route exact path={IssuanceRoute.create}>
        <CreateDSO />
      </Route>

      <Route exact path={IssuanceRoute.view}>
        <ViewDSO />
      </Route>

      <Route exact path={IssuanceRoute.edit}>
        <EditDSO />
      </Route>

      <Route exact path={IssuanceRoute.preview}>
        <PreviewDSO />
      </Route>

      <Route exact path={IssuanceRoute.deployToken}>
        <DeployToken />
      </Route>

      <Route exact path={IssuanceRoute.list}>
        <DSOList />
      </Route>

      <Route path={IssuanceRoute.insight}>
        <IssuanceLanding />
      </Route>
    </Switch>
  )
}
