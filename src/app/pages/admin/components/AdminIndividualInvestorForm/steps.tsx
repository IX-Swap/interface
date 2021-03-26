import React, { Fragment } from 'react'
import { AdminIndividualIdentityView } from 'app/pages/admin/components/AdminIndividualInvestorForm/AdminIndividualIdentityView'
import { individualInvestorFormSteps } from 'app/pages/_identity/components/IndividualInvestorForm/steps'

export const adminIndividualInvestorFormSteps = [
  ...individualInvestorFormSteps.slice(0, -1),
  {
    label: 'Review & Submit',
    getFormValues: () => {},
    getRequestPayload: () => {},
    validationSchema: null,
    component: () => (
      <Fragment>
        <AdminIndividualIdentityView />
      </Fragment>
    )
  }
]
