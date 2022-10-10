import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOFormValues } from 'types/dso'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'
import {
  getDSOInformationSchema,
  getDSOCompanyInformationSchema,
  getDSODocumentschema
} from 'validation/dso'
import { getDSOInformationFormValues } from './utils'
import { getDSOInformationRequestPayload } from './requests'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: getDSOInformationFormValues,
    getRequestPayload: getDSOInformationRequestPayload,
    validationSchema: getDSOInformationSchema,
    component: () => <DSOInformationFields />
  },
  {
    label: 'Company Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        team: data.team ?? [{}],
        introduction: data.introduction ?? '',
        businessModel: data.businessModel ?? '',
        useOfProceeds: data.useOfProceeds ?? '',
        fundraisingMilestone: data.fundraisingMilestone ?? '',
        step: 1
      }
    },
    getRequestPayload: (values: any) => {
      return { ...values, step: 2 }
    },
    validationSchema: getDSOCompanyInformationSchema,
    initialValidationSchema: getDSOCompanyInformationSchema,
    component: () => <DSOCompanyInformationFields />
  },
  {
    label: 'Documents',
    getFormValues: (data: DSOFormValues) => {
      return {
        subscriptionDocument: data.subscriptionDocument,
        documents: data.documents,
        videos: data.videos ?? [{}],
        faqs: data.faqs ?? [{}],
        step: 2
      }
    },
    getRequestPayload: (values: any) => {
      return { ...values, step: 3 }
    },
    validationSchema: getDSODocumentschema,
    component: () => <DSODocumentsFields />
  }
]
