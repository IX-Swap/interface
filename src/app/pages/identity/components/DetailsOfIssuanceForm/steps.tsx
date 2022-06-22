import { DetailsOfIssuanceView } from 'app/pages/identity/components/DetailsOfIssuanceView/DetailsOfIssuanceView'
import { IssuerDetails } from 'app/pages/identity/components/IssuerDetails/IssuerDetails'
import { IssuerDocuments } from 'app/pages/identity/components/IssuerDocuments/IssuerDocuments'
import {
  getIssuerDetailsFormValues,
  getIssuerDocumentsFormValues
} from 'app/pages/identity/utils/detailsOfIssuance/forms'
import {
  getIssuerDetailsRequestPayload,
  getIssuerDocumentsRequestPayload
} from 'app/pages/identity/utils/detailsOfIssuance/requests'
import {
  detailsOfIssuanceSchema,
  issuerDetailsSchema,
  issuerDocumentsSchema
} from 'app/pages/identity/validation/detailsOfIssuance'
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
    getFormValues: (data: any) => {
      const allData = {
        ...getIssuerDetailsFormValues(data),
        ...getIssuerDocumentsFormValues(data)
      }
      return allData
    },
    getRequestPayload: (data: any) => {
      const allData = {
        ...getIssuerDetailsRequestPayload(data),
        ...getIssuerDocumentsRequestPayload(data)
      }
      return allData
    },
    validationSchema: detailsOfIssuanceSchema,
    component: () => (
      <Fragment>
        <DetailsOfIssuanceView />
      </Fragment>
    )
  }
]
