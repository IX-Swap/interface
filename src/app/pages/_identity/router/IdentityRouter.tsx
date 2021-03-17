import { CreateIndividual } from 'app/pages/_identity/pages/CreateIndividual/CreateIndividual'
import { CreateInvestor } from 'app/pages/_identity/pages/CreateInvestor/CreateInvestor'
import { CreateIssuer } from 'app/pages/_identity/pages/CreateIssuer/CreateIssuer'
import { EditIndividual } from 'app/pages/_identity/pages/EditIndividual/EditIndividual'
import { EditInvestor } from 'app/pages/_identity/pages/EditInvestor/EditInvestor'
import { EditIssuer } from 'app/pages/_identity/pages/EditIssuer/EditIssuer'
import { IdentitiesList } from 'app/pages/_identity/pages/IdentitiesList/IdentitiesList'
import { ViewIndividual } from 'app/pages/_identity/pages/ViewIndividual/ViewIndividual'
import { ViewInvestor } from 'app/pages/_identity/pages/ViewInvestor/ViewInvestor'
import { ViewIssuer } from 'app/pages/_identity/pages/ViewIssuer/ViewIssuer'
import React from 'react'
import { Route, Switch } from 'react-router'
import { IdentityRoute } from './config'

export const IdentityRouter = () => {
  return (
    <Switch>
      <Route exact path={IdentityRoute.list}>
        <IdentitiesList />
      </Route>

      <Route exact path={IdentityRoute.viewIndividual}>
        <ViewIndividual />
      </Route>

      <Route exact path={IdentityRoute.createIndividual}>
        <CreateIndividual />
      </Route>

      <Route exact path={IdentityRoute.editIndividual}>
        <EditIndividual />
      </Route>

      <Route exact path={IdentityRoute.corporate}>
        <ViewInvestor />
      </Route>

      <Route exact path={IdentityRoute.createCorporate}>
        <CreateInvestor />
      </Route>

      <Route exact path={IdentityRoute.editCorporate}>
        <EditInvestor />
      </Route>

      <Route exact path={IdentityRoute.viewIssuer}>
        <ViewIssuer />
      </Route>

      <Route exact path={IdentityRoute.createIssuer}>
        <CreateIssuer />
      </Route>

      <Route exact path={IdentityRoute.editIssuer}>
        <EditIssuer />
      </Route>
    </Switch>
  )
}
