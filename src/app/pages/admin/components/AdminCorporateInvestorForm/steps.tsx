import React, { Fragment } from 'react'
import { AdminCorporateIdentityView } from 'app/pages/admin/components/AdminCorporateInvestorForm/AdminCorporateIdentityView'
import { getCorporateInvestorFormSteps } from 'app/pages/identity/components/CorporateInvestorForm/steps'

export const adminCorporateInvestorFormSteps = [
  ...getCorporateInvestorFormSteps('investor').slice(0, -1),
  {
    label: 'Review & Submit',
    getFormValues: () => null,
    getRequestPayload: {},
    validationSchema: {},
    component: () => (
      <Fragment>
        <AdminCorporateIdentityView />
      </Fragment>
    )
  }
]
