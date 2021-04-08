import { IssuerDetails } from 'app/pages/_identity/components/IssuerDetails/IssuerDetails'
import { IssuerDocuments } from 'app/pages/_identity/components/IssuerDocuments/IssuerDocuments'
import {
  getIssuerDetailsFormValues,
  getIssuerDocumentsFormValues
} from 'app/pages/_identity/utils/detailsOfIssuance/forms'
import {
  getIssuerDetailsRequestPayload,
  getIssuerDocumentsRequestPayload
} from 'app/pages/_identity/utils/detailsOfIssuance/requests'
import {
  issuerDetailsSchema,
  issuerDocumentsSchema
} from 'app/pages/_identity/validation/detailsOfIssuance'
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
    getFormValues: getIssuerDocumentsFormValues,
    getRequestPayload: getIssuerDocumentsRequestPayload,
    validationSchema: issuerDocumentsSchema,
    component: () => (
      <Fragment>
        <IssuerDocuments />
      </Fragment>
    )
  },
  {
    label: 'Review & Submit',
    getFormValues: () => {},
    getRequestPayload: () => {},
    validationSchema: {},
    component: () => <Fragment></Fragment>
  }
]
