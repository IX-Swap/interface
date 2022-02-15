import React from 'react'
import { Switch } from 'react-router-dom'
import { AppRoute } from 'components/AppRoute'
import { IssuanceRoute } from 'app/pages/issuance/router/config'
import { FinancialReports } from 'app/pages/issuance/pages/FinancialReports/FinancialReports'
import { UploadReport } from 'app/pages/issuance/pages/FinancialReports/UploadReport'
import { ViewReport } from 'app/pages/issuance/pages/FinancialReports/ViewReport'

export const FinancialReportsRouter = () => {
  return (
    <Switch>
      <AppRoute
        breadcrumb='Financial Reports'
        exact
        path={IssuanceRoute.financialReports}
      >
        <FinancialReports />
      </AppRoute>
      <AppRoute
        breadcrumb='Upload Report'
        exact
        path={IssuanceRoute.uploadReport}
      >
        <UploadReport />
      </AppRoute>
      <AppRoute breadcrumb='View Report' exact path={IssuanceRoute.viewReport}>
        <ViewReport />
      </AppRoute>
    </Switch>
  )
}
