import React from 'react'
import { DSOCompanyInformationFields } from 'app/components/DSO/components/DSOCompanyInformationFields'
import { DSOFormValues } from 'types/dso'
import { DSODocumentsFields } from 'app/components/DSO/components/DSODocumentsFields'
import { DSOInformationFields } from 'app/components/DSO/components/DSOInformationFields'

export const dsoFormSteps = [
  {
    label: 'DSO Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        tokenName: data.tokenName
      }
    },
    getRequestPayload: {},
    validationSchema: {},
    component: () => <DSOInformationFields />
  },
  {
    label: 'Company Information',
    getFormValues: (data: DSOFormValues) => {
      return {
        team: data.team ?? [{}],
        introduction: data.introduction,
        businessModel: data.businessModel,
        useOfProceeds: data.useOfProceeds,
        fundraisingMilestone: data.fundraisingMilestone
      }
    },
    getRequestPayload: (values: any) => {
      return values
    },
    validationSchema: {},
    component: () => <DSOCompanyInformationFields />
  },
  {
    label: 'Documents',
    getFormValues: (data: DSOFormValues) => {
      return {
        subscriptionDocument: data.subscriptionDocument,
        documents: data.documents,
        videos: data.videos ?? [{}],
        faqs: data.faqs ?? [{}]
      }
    },
    getRequestPayload: {},
    validationSchema: {},
    component: () => <DSODocumentsFields />
  }
]
