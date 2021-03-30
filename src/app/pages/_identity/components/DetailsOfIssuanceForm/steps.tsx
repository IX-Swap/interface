import { IssuerDetails } from 'app/pages/_identity/components/IssuerDetails/IssuerDetails'
import { getIssuerDetailsFormValues } from 'app/pages/_identity/utils/detailsOfIssuance/forms'
import { getIssuerDetailsRequestPayload } from 'app/pages/_identity/utils/detailsOfIssuance/requests'
import { issuerDetailsSchema } from 'app/pages/_identity/validation/detailsOfIssuance'
import React, { Fragment } from 'react'

export const detailsOfIssuanceFormSteps = [
  {
    label: 'Issuer Details',
    getFormValues: getIssuerDetailsFormValues,
    getRequestPayload: getIssuerDetailsRequestPayload,
    validationSchema: issuerDetailsSchema,
    component: () => (
      <Fragment>
        <IssuerDetails />
      </Fragment>
    )
  },
  {
    label: 'Upload Documents',
    getFormValues: () => {},
    getRequestPayload: () => {},
    validationSchema: {},
    component: () => <Fragment></Fragment>
  },
  {
    label: 'Review & Submit',
    getFormValues: () => {},
    getRequestPayload: () => {},
    validationSchema: {},
    component: () => <Fragment></Fragment>
  }
]
