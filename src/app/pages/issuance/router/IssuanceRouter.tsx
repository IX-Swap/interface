import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { CreateDSO } from 'app/pages/issuance/pages/CreateDSO'
import { DeployToken } from 'app/pages/issuance/pages/DeployToken'
import { DSOList } from 'app/pages/issuance/pages/DSOList'
import { EditDSO } from 'app/pages/issuance/pages/EditDSO'
import { IssuanceLanding } from 'app/pages/issuance/pages/IssuanceLanding'
import { ViewDSO } from 'app/pages/issuance/pages/ViewDSO'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { PreviewDSO } from 'app/pages/issuance/pages/PreviewDSO'
import { AppRoute } from 'components/AppRoute'
import { Commitments } from 'app/pages/issuance/pages/Commitments'
import { useIsIssuer } from 'helpers/acl'
import { CapTableRouter } from 'app/pages/issuance/router/CapTableRouter'
import { FinancialReportsRouter } from 'app/pages/issuance/router/FinancialReportsRouter'
import { CreateListing } from 'app/pages/issuance/pages/create-listing/CreateListing'
import { MyListingsRouter } from 'app/pages/invest/router/MyListingsRouter'

export const IssuanceRouter = () => {
  const isIssuer = useIsIssuer()

  return (
    <Switch>
      <AppRoute exact path={IssuanceRoute.root}>
        <Redirect to={IssuanceRoute.insight} />
      </AppRoute>

      <AppRoute
        breadcrumb='Create Digital Security Offering'
        exact
        path={IssuanceRoute.create}
      >
        <CreateDSO />
      </AppRoute>

      <AppRoute
        breadcrumb='View Digital Security Offering'
        exact
        path={IssuanceRoute.view}
      >
        <ViewDSO />
      </AppRoute>

      <AppRoute
        breadcrumb='Edit Digital Security Offering'
        exact
        path={IssuanceRoute.edit}
      >
        <EditDSO />
      </AppRoute>

      <AppRoute
        breadcrumb='Preview Digital Security Offering'
        exact
        path={IssuanceRoute.preview}
      >
        <PreviewDSO />
      </AppRoute>

      <AppRoute
        breadcrumb='Deploy Token'
        exact
        path={IssuanceRoute.deployToken}
      >
        <DeployToken />
      </AppRoute>

      <AppRoute
        breadcrumb='My Digital Security Offerings'
        exact
        path={IssuanceRoute.list}
      >
        <DSOList />
      </AppRoute>

      <AppRoute breadcrumb='Issuance' path={IssuanceRoute.insight}>
        <IssuanceLanding />
      </AppRoute>

      <AppRoute breadcrumb='My Listings' path={IssuanceRoute.myListings}>
        <MyListingsRouter />
      </AppRoute>

      <AppRoute breadcrumb='Create Listing' path={IssuanceRoute.createListing}>
        <CreateListing />
      </AppRoute>

      {isIssuer ? (
        <AppRoute
          breadcrumb='Commitments'
          exact
          path={IssuanceRoute.commitments}
        >
          <Commitments />
        </AppRoute>
      ) : null}

      {isIssuer ? (
        <AppRoute
          breadcrumb='Cap Table Management'
          path={IssuanceRoute.capTable}
        >
          <CapTableRouter />
        </AppRoute>
      ) : null}

      {isIssuer ? (
        <AppRoute
          breadcrumb='Financial Reports'
          path={IssuanceRoute.financialReports}
        >
          <FinancialReportsRouter />
        </AppRoute>
      ) : null}
    </Switch>
  )
}
