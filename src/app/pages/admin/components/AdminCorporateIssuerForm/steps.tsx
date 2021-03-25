import React, { Fragment } from 'react'
import { AdminCorporateIdentityView } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateIdentityView'
import { corporateIssuerFormSteps } from 'app/pages/_identity/components/CorporateIssuerForm/steps'

export const adminCorporateIssuerFormSteps = [
  ...corporateIssuerFormSteps.slice(0, -1),
  {
    label: 'Review & Submit',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => (
      <Fragment>
        <AdminCorporateIdentityView isCorporateIssuerForm />
      </Fragment>
    )
  }
]
